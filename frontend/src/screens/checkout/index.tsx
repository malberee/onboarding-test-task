import styled from 'styled-components'

import { useAppSelector } from '@/hooks'

import { usePlans } from './hooks'
import { PaymentForm } from './payment-form'
import { PlanSelector } from './plan-selector'

export const CheckoutScreen = () => {
  const { isLoading, isError, plans } = usePlans()
  const clientSecret = useAppSelector((state) => state.payment.clientSecret)

  if (isLoading) return <span>Loading...</span>
  if (isError) return <span>Error</span>

  return (
    <Wrapper>
      <PlanSelector plans={plans} />
      {clientSecret && <PaymentForm clientSecret={clientSecret} />}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-inline: auto;
  max-width: 320px;
`
