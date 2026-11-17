import styled from 'styled-components'

import { Button } from '@/components'
import { useAppDispatch, useAppSelector, useFlowNavigation } from '@/hooks'
import { setAnswer } from '@/store'

const answers = ['Zhmerinka', 'New-York', 'Kyiv']

export const QuizMultiScreen = () => {
  const values = useAppSelector((state) => state.onboarding.answers.multi)
  const dispatch = useAppDispatch()
  const { next } = useFlowNavigation()

  const handleChange = (key: string, isChecked: boolean) => {
    const newValues = isChecked
      ? [...values, key]
      : values.filter((item) => item !== key)

    dispatch(setAnswer({ questionId: 'multi', answer: newValues }))
  }

  return (
    <Form>
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
      <Button type="button" onClick={next}>
        Submit
      </Button>
    </Form>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;

  width: 100%;
  max-width: 320px;

  margin-inline: auto;
  margin-top: 40px;
`
