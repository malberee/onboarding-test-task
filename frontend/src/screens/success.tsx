import { Link } from 'react-router'
import styled from 'styled-components'

import { routes } from '@/constants'
import { useAppSelector } from '@/hooks'

import { usePlans } from './checkout/hooks'

export const SuccessScreen = () => {
  const { plans, isError, isLoading } = usePlans()
  const selectedPlan = useAppSelector((state) => state.onboarding.selectedPlan)

  const plan = plans?.find((plan) => plan.id === selectedPlan)

  return (
    <Wrapper>
      <h1>Success! ✅</h1>
      <Link to={routes.checkout}>Go to checkout again</Link>

      <div>
        {isLoading && <span>Loading...</span>}
        {isError && <span>The plan could not be loaded</span>}
        {plan && (
          <>
            <p>{plan.name}</p>
            <p>
              {plan.amount / 100}
              {plan.currency}
            </p>
            <p>{plan.period}</p>
          </>
        )}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
