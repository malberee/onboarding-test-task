import { createAsyncThunk } from '@reduxjs/toolkit'

import { createPayment, type CreatePaymentIntentResponse } from '@/services/api'

import type { RootState } from '../store'
import { setIdempotencyKey } from './slice'

export const createPaymentIntent = createAsyncThunk<
  CreatePaymentIntentResponse,
  void,
  { state: RootState }
>('payment/create', async (_, { getState, rejectWithValue, dispatch }) => {
  const { phone, email, selectedPlan } = getState().onboarding
  const paymentState = getState().payment

  if (!email || !phone) {
    return rejectWithValue('Email and phone are required')
  }

  if (!selectedPlan) {
    return rejectWithValue('Plan is required')
  }

  const data = {
    planId: selectedPlan,
    email,
    phone,
  }

  const idempotencyKey = paymentState.idempotencyKey ?? crypto.randomUUID()

  dispatch(setIdempotencyKey(idempotencyKey))

  try {
    return await createPayment(data, idempotencyKey)
  } catch (error) {
    console.log('error: ', error)
    return rejectWithValue(
      error instanceof Error ? error.message : 'Failed to create payment',
    )
  }
})
