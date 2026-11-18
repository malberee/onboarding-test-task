import { createSlice } from '@reduxjs/toolkit'

import { FetchStatus, type PaymentIntent } from '@/services/api'

import { createPaymentIntent } from './thunks'

interface PaymentState {
  paymentIntent: PaymentIntent | null
  clientSecret: string | null
  requestStatus: FetchStatus
  errorMessage: string | null
  idempotencyKey: string | null
}

const initialState: PaymentState = {
  paymentIntent: null,
  clientSecret: null,
  requestStatus: FetchStatus.IDLE,
  errorMessage: null,
  idempotencyKey: null,
}

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setIdempotencyKey: (state, action) => {
      state.idempotencyKey = action.payload
    },
    resetPayment: (state) => {
      state.paymentIntent = null
      state.clientSecret = null
      state.requestStatus = FetchStatus.IDLE
      state.errorMessage = null
      state.idempotencyKey = null
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(createPaymentIntent.pending, (state) => {
        state.requestStatus = FetchStatus.LOADING
        state.errorMessage = null
      })
      .addCase(createPaymentIntent.fulfilled, (state, action) => {
        const { clientSecret, ...payment } = action.payload

        state.paymentIntent = payment
        state.clientSecret = clientSecret
        state.requestStatus = FetchStatus.SUCCEEDED
      })
      .addCase(createPaymentIntent.rejected, (state, action) => {
        state.requestStatus = FetchStatus.FAILED
        state.errorMessage = action.error.message ?? 'Failed to create payment'
      }),
})

export const { setIdempotencyKey, resetPayment } = paymentSlice.actions

export const paymentReducer = paymentSlice.reducer
