import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type QuizAnswerPayload =
  | { questionId: 'single'; answer: string }
  | { questionId: 'multi'; answer: string[] }

interface OnboardingState {
  phone: string | null
  email: string | null
  quiz_single: string | null
  quiz_multi: string[]
  selectedPlan: string | null
}

const initialState: OnboardingState = {
  phone: null,
  email: null,
  quiz_single: null,
  quiz_multi: [],
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
    setQuizAnswer: (state, action: PayloadAction<QuizAnswerPayload>) => {
      if (action.payload.questionId === 'single') {
        state.quiz_single = action.payload.answer
      } else {
        state.quiz_multi = action.payload.answer
      }
    },
    setSelectedPlan: (state, action: PayloadAction<string>) => {
      state.selectedPlan = action.payload
    },
  },
})

export const { setPhone, setEmail, setQuizAnswer, setSelectedPlan } =
  onboardingSlice.actions

export const onboardingReducer = onboardingSlice.reducer
