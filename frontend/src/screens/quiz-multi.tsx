import type { SyntheticEvent } from 'react'

import { Button, Form } from '@/components'
import { useAppDispatch, useAppSelector, useFlowNavigation } from '@/hooks'
import { setQuizAnswer } from '@/store'

const answers = ['Zhmerinka', 'New-York', 'Kyiv']

export const QuizMultiScreen = () => {
  const values = useAppSelector((state) => state.onboarding.quiz_multi)
  const dispatch = useAppDispatch()
  const { next } = useFlowNavigation()

  const handleChange = (key: string, isChecked: boolean) => {
    const newValues = isChecked
      ? [...values, key]
      : values.filter((item) => item !== key)

    dispatch(setQuizAnswer({ questionId: 'multi', answer: newValues }))
  }

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (values.length > 0) {
      next()
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      {answers.map((answer) => (
        <label key={answer}>
          <input
            type="checkbox"
            name="quiz"
            value={answer}
            checked={values.includes(answer)}
            onChange={(e) => handleChange(answer, e.target.checked)}
          />
          {answer}
        </label>
      ))}
      <Button>Submit</Button>
    </Form>
  )
}
