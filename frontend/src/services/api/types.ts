import { flowName } from './constants'

export interface AppConfig {
  publishableKey: string
}

export type FlowName = (typeof flowName)[keyof typeof flowName]

export interface Flow {
  name: 'default' | 'short' | 'experimental'
  screens: string[]
}

export interface Plan {
  id: string
  name: string
  amount: number
  currency: string
  period: string
  popular?: boolean
}

export interface PlansResponse {
  plans: Plan[]
}

export interface CreatePaymentRequest {
  planId: string
  email: string
  phone: string
}

export type PaymentStatus =
  | 'requires_payment_method'
  | 'requires_action'
  | 'processing'
  | 'succeeded'
  | 'canceled'

export interface Payment {
  id: string
  status: PaymentStatus
  planId: string | null
  amount: number
  currency: string
  errorMessage: string | null
}

export interface CreatePaymentResponse extends Payment {
  clientSecret: string | null
}

export interface ApiErrorResponse {
  error: {
    code: string
    message: string
  }
}
