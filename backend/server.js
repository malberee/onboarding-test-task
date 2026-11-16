import express from 'express'
import cors from 'cors'
import Stripe from 'stripe'
import { PLANS, findPlan } from './plans.js'
import { DEFAULT_FLOW, findFlow } from './flows.js'

const {
  STRIPE_SECRET_KEY,
  STRIPE_PUBLISHABLE_KEY,
  PORT = 4242,
  CLIENT_ORIGIN = 'http://localhost:5173',
  PAYMENT_METHOD_TYPES,
} = process.env

if (STRIPE_SECRET_KEY?.startsWith('sk_live') || STRIPE_PUBLISHABLE_KEY?.startsWith('pk_live')) {
  console.error('Live Stripe keys are not allowed. Use test keys only (sk_test_… / pk_test_…).')
  process.exit(1)
}

const stripe = STRIPE_SECRET_KEY ? new Stripe(STRIPE_SECRET_KEY) : null

class ApiError extends Error {
  constructor(status, code, message) {
    super(message)
    this.status = status
    this.code = code
  }
}

const requireStripe = () => {
  if (!stripe || !STRIPE_PUBLISHABLE_KEY) {
    throw new ApiError(
      503,
      'stripe_not_configured',
      'Stripe keys are not set. Copy .env.example to .env and fill in your test keys.',
    )
  }
  return stripe
}

const toPayment = (intent) => ({
  id: intent.id,
  status: intent.status,
  planId: intent.metadata?.planId ?? null,
  amount: intent.amount,
  currency: intent.currency,
  errorMessage: intent.last_payment_error?.message ?? null,
})

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^\+[1-9]\d{6,14}$/

const app = express()
app.use(cors({ origin: CLIENT_ORIGIN.split(',').map((origin) => origin.trim()) }))
app.use(express.json())

app.get(['/', '/health'], (_req, res) => {
  res.json({ ok: true, stripeConfigured: Boolean(stripe && STRIPE_PUBLISHABLE_KEY) })
})

app.get('/config', (_req, res) => {
  requireStripe()
  res.json({ publishableKey: STRIPE_PUBLISHABLE_KEY })
})

app.get('/plans', (_req, res) => {
  res.json({ plans: PLANS })
})

app.get('/flow', (req, res) => {
  const name = req.query.name ?? DEFAULT_FLOW
  const screens = typeof name === 'string' ? findFlow(name) : undefined

  if (!screens) throw new ApiError(404, 'flow_not_found', `Unknown flow: ${name}`)

  res.json({ name, screens })
})

app.post('/payments', async (req, res) => {
  const { planId, email, phone } = req.body ?? {}
  const plan = findPlan(planId)

  if (!plan) throw new ApiError(400, 'invalid_plan', `Unknown planId: ${planId}`)
  if (typeof email !== 'string' || !EMAIL_RE.test(email)) {
    throw new ApiError(400, 'invalid_email', 'Invalid email')
  }
  if (typeof phone !== 'string' || !PHONE_RE.test(phone)) {
    throw new ApiError(400, 'invalid_phone', 'Invalid phone. Expected E.164 format, e.g. +380501234567')
  }

  const idempotencyKey = req.get('Idempotency-Key')
  const methodTypes = PAYMENT_METHOD_TYPES?.split(',').map((type) => type.trim()).filter(Boolean)

  const intent = await requireStripe().paymentIntents.create(
    {
      amount: plan.amount,
      currency: plan.currency,
      metadata: { planId: plan.id, email, phone },
      ...(methodTypes?.length
        ? { payment_method_types: methodTypes }
        : { automatic_payment_methods: { enabled: true } }),
    },
    idempotencyKey ? { idempotencyKey } : undefined,
  )

  res.status(201).json({ ...toPayment(intent), clientSecret: intent.client_secret })
})

app.get('/payments/:id', async (req, res) => {
  const { id } = req.params
  if (!/^pi_[A-Za-z0-9]+$/.test(id)) throw new ApiError(400, 'invalid_payment_id', 'Invalid payment id')

  const intent = await requireStripe().paymentIntents.retrieve(id)
  res.json(toPayment(intent))
})

app.use((_req, _res, next) => next(new ApiError(404, 'not_found', 'Route not found')))

app.use((err, _req, res, _next) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ error: { code: err.code, message: err.message } })
  }
  if (err?.type?.startsWith('Stripe')) {
    return res
      .status(err.statusCode ?? 502)
      .json({ error: { code: err.code ?? 'stripe_error', message: err.message } })
  }
  if (err?.type === 'entity.parse.failed') {
    return res.status(400).json({ error: { code: 'invalid_json', message: 'Invalid JSON in request body' } })
  }
  console.error(err)
  res.status(500).json({ error: { code: 'internal_error', message: 'Internal server error' } })
})

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`API: http://localhost:${PORT}`)
    if (!stripe || !STRIPE_PUBLISHABLE_KEY) {
      console.warn('Stripe keys are not set: /plans works, /config and /payments return 503.')
    }
  })
}

export default app
