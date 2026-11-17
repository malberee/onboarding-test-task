import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface Answers {
  single: string | null
  multi: string[]
}

type AnswerPayload =
  | { questionId: 'single'; answer: string }
  | { questionId: 'multi'; answer: string[] }

interface OnboardingState {
  phone: string
  email: string
  answers: Answers
  selectedPlan: string | null
}

const initialState: OnboardingState = {
  phone: '',
  email: '',
  answers: {
    single: null,
    multi: [],
  },
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
    setAnswer: (state, action: PayloadAction<AnswerPayload>) => {
      if (action.payload.questionId === 'single') {
        state.answers.single = action.payload.answer
      } else {
        state.answers.multi = action.payload.answer
      }
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
