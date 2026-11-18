import { loadStripe } from '@stripe/stripe-js'

import { getConfig } from '@/services/api'

export const stripePromise = getConfig().then(({ publishableKey }) => {
  return loadStripe(publishableKey)
})
