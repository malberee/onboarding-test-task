import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface OnboardingState {
  phone: string
  email: string
  answers: Record<string, string | string[]>
  selectedPlan: string | null
}

const initialState: OnboardingState = {
  phone: '',
  email: '',
  answers: {},
  selectedPlan: null,
}

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
    setAnswer: (
      state,
      action: PayloadAction<{ questionId: string; answer: string | string[] }>,
    ) => {
      state.answers[action.payload.questionId] = action.payload.answer
    },
    setSelectedPlan: (state, action: PayloadAction<string>) => {
      state.selectedPlan = action.payload
    },
    resetOnboarding: () => initialState,
  },
})

export const {
  setPhone,
  setEmail,
  setAnswer,
  setSelectedPlan,
  resetOnboarding,
} = onboardingSlice.actions

export default onboardingSlice.reducer
