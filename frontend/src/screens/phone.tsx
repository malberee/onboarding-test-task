import { useState } from 'react'
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import styled from 'styled-components'

import { Button, Form, Input } from '@/components'
import { useAppDispatch, useAppSelector, useFlowNavigation } from '@/hooks'
import { setPhone } from '@/store'

export const PhoneScreen = () => {
  const phone = useAppSelector((state) => state.onboarding.phone)
  const dispatch = useAppDispatch()
  const { next } = useFlowNavigation()

  const [isError, setIsError] = useState(false)

  const handleSubmit = () => {
    if (phone && isPossiblePhoneNumber(phone)) {
      next()
    } else {
      setIsError(true)
    }
  }

  const handleChange = (value?: string) => {
    if (value) {
      setIsError(false)
      dispatch(setPhone(value))
    }
  }

  return (
    <Form>
      <PhoneInput
        placeholder="Enter phone number"
        international
        countryCallingCodeEditable={false}
        inputComponent={Input}
        value={phone ?? ''}
        onChange={handleChange}
      />
      {isError && <ErrorMessage>Invalid phone number</ErrorMessage>}
      <Button type="button" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  )
}

const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.danger};
`
