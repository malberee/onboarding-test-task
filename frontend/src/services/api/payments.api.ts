import { apiRequest } from './client'
import { apiEndpoints } from './constants'
import type {
  CreatePaymentRequest,
  CreatePaymentResponse,
  Payment,
} from './types'

export const createPayment = (
  data: CreatePaymentRequest,
  idempotencyKey: string,
) => {
  return apiRequest<CreatePaymentResponse>(apiEndpoints.payments, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Idempotency-Key': idempotencyKey,
    },
  })
}

export const getPayment = (id: string) => {
  return apiRequest<Payment>(`${apiEndpoints.payments}/${id}`)
}
