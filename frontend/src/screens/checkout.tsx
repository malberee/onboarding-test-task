import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { Button } from '@/components'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { getPlans, type Plan } from '@/services/api'
import { setSelectedPlan } from '@/store'

export const CheckoutScreen = () => {
  const selectedPlan = useAppSelector((state) => state.onboarding.selectedPlan)
  const dispatch = useAppDispatch()

  const [plans, setPlans] = useState<Plan[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setIsLoading(true)
        const response = await getPlans()
        setPlans(response.plans)
      } catch {
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPlans()
  }, [])

  return isLoading ? (
    <span>Loading...</span>
  ) : isError ? (
    <span>Error</span>
  ) : (
    <Form>
      <PlansList>
        {plans.map(({ id, name }) => (
          <PlanItem key={id}>
            <input
              type="radio"
              name="quiz"
              value={id}
              checked={selectedPlan === id}
              onChange={(e) => dispatch(setSelectedPlan(e.target.value))}
            />
            {name}
          </PlanItem>
        ))}
      </PlansList>
      <Button type="button">Submit</Button>
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

const PlansList = styled.div`
  display: flex;
  justify-content: space-between;
`

const PlanItem = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100px;
  height: 100px;

  background-color: ${({ theme }) => theme.colors.surface};

  border-radius: ${({ theme }) => theme.radius.md};
`
