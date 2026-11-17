import styled from 'styled-components'

import { Button } from '@/components'
import { useAppDispatch, useAppSelector, useFlowNavigation } from '@/hooks'
import { setAnswer } from '@/store'

const answers = ['Zhmerinka', 'New-York', 'Kyiv']

export const QuizSingleScreen = () => {
  const value = useAppSelector((state) => state.onboarding.answers.single)
  const dispatch = useAppDispatch()
  const { next } = useFlowNavigation()

  return (
    <Form>
      {answers.map((answer) => (
        <label>
          <input
            type="radio"
            name="quiz"
            checked={value === answer}
            onClick={() =>
              dispatch(setAnswer({ questionId: 'single', answer }))
            }
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
