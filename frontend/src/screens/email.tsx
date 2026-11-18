import { useState } from 'react'
import styled from 'styled-components'

import { Button, Form, Input } from '@/components'
import { useAppDispatch, useAppSelector, useFlowNavigation } from '@/hooks'
import { setEmail } from '@/store'

const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export const EmailScreen = () => {
  const email = useAppSelector((state) => state.onboarding.email) ?? ''
  const dispatch = useAppDispatch()
  const { next } = useFlowNavigation()

  const [error, setError] = useState<string | null>(null)

  const handleSubmit = () => {
    if (email && emailRegexp.test(email)) {
      next()
    } else {
      setError('Invalid email')
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
        value={email}
        onChange={(e) => handleChange(e.target.value)}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Button type="button" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  )
}

const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.danger};
`
