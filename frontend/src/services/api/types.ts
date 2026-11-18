export interface AppConfig {
  publishableKey: string
}

export enum FlowName {
  DEFAULT = 'default',
  SHORT = 'short',
  EXPERIMENTAL = 'experimental',
}

export enum FetchStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
}

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

export interface CreatePaymentIntentRequest {
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

export interface PaymentIntent {
  id: string
  status: PaymentStatus
  planId: string | null
  amount: number
  currency: string
  errorMessage: string | null
}

export interface CreatePaymentIntentResponse extends PaymentIntent {
  clientSecret: string | null
}

export interface ApiErrorResponse {
  error: {
    code: string
    message: string
  }
}
