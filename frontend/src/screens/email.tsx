import { useState } from 'react'
import styled from 'styled-components'

import { Button, Input } from '@/components'
import { useAppDispatch, useAppSelector, useFlowNavigation } from '@/hooks'
import { setEmail } from '@/store'

export const EmailScreen = () => {
  const email = useAppSelector((state) => state.onboarding.email)
  const dispatch = useAppDispatch()
  const { next } = useFlowNavigation()

  const [error, setError] = useState<string | null>(null)

  const handleSubmit = () => {
    // temp
    const hasError = false

    if (!hasError) {
      console.log(email)
      next()
    } else {
      setError('some temp error')
    }
  }

  const handleChange = (value: string) => {
    dispatch(setEmail(value))
    setError(null)
  }

  return (
    <Form>
      <Input
        placeholder="Enter email"
        type="email"
        onChange={(e) => handleChange(e.target.value)}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Button type="button" onClick={handleSubmit}>
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

const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.danger};
`
