import type { SyntheticEvent } from 'react'

import { Button, Form } from '@/components'
import { useAppDispatch, useAppSelector, useFlowNavigation } from '@/hooks'
import { setQuizAnswer } from '@/store'

const answers = ['Zhmerinka', 'New-York', 'Kyiv']

export const QuizSingleScreen = () => {
  const value = useAppSelector((state) => state.onboarding.quiz_single)
  const dispatch = useAppDispatch()
  const { next } = useFlowNavigation()

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (value) {
      next()
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      {answers.map((answer) => (
        <label key={answer}>
          <input
            type="radio"
            name="quiz"
            checked={value === answer}
            onChange={() =>
              dispatch(setQuizAnswer({ questionId: 'single', answer }))
            }
          />
          {answer}
        </label>
      ))}

      <Button>Submit</Button>
    </Form>
  )
}
