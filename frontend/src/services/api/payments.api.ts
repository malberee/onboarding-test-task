import { apiRequest } from './client'
import { apiEndpoints } from './constants'
import type {
  CreatePaymentIntentRequest,
  CreatePaymentIntentResponse,
  PaymentIntent,
} from './types'

export const createPayment = (
  data: CreatePaymentIntentRequest,
  idempotencyKey: string,
) => {
  return apiRequest<CreatePaymentIntentResponse>(apiEndpoints.payments, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Idempotency-Key': idempotencyKey,
    },
  })
}

export const getPayment = (id: string) => {
  return apiRequest<PaymentIntent>(`${apiEndpoints.payments}/${id}`)
}
