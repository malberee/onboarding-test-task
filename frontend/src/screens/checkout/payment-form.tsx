import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'
import { useState } from 'react'
import styled from 'styled-components'

import { Button } from '@/components'
import { routes } from '@/constants'
import { useAppSelector } from '@/hooks'

import { usePaymentVerification } from './hooks'
import { stripePromise } from './utils'

interface PaymentFormProps {
  clientSecret: string
}

const PaymentFormContent = () => {
  const stripe = useStripe()
  const elements = useElements()
  const selectedPlan = useAppSelector((state) => state.onboarding.selectedPlan)
  const { isVerifying, verifyPayment } = usePaymentVerification()

  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!stripe || !elements || !selectedPlan) {
      return
    }

    setIsLoading(true)
    setErrorMessage(null)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}${routes.checkout}`,
      },
      redirect: 'if_required',
    })

    if (error) {
      setErrorMessage(error.message ?? 'An unexpected error occurred.')
    }

    const result = await verifyPayment()

    if (result) {
      console.log('payment veryfied')
    }

    setIsLoading(false)
  }

  return (
    <Form>
      <PaymentElement />

      {errorMessage && <p>{errorMessage}</p>}

      <Button
        type="submit"
        disabled={!selectedPlan || isLoading || isVerifying}
        onClick={handleSubmit}
      >
        {isLoading || isVerifying ? 'Processing...' : 'Pay'}
      </Button>
    </Form>
  )
}

export const PaymentForm = ({ clientSecret }: PaymentFormProps) => {
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <PaymentFormContent />
    </Elements>
  )
}

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`
