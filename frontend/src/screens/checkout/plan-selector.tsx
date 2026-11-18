import styled from 'styled-components'

import { Button, Form } from '@/components'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { type Plan } from '@/services/api'
import { createPaymentIntent, setSelectedPlan } from '@/store'

interface PlanSelectorProps {
  plans: Plan[]
}

export const PlanSelector = ({ plans }: PlanSelectorProps) => {
  const selectedPlan = useAppSelector((state) => state.onboarding.selectedPlan)
  const dispatch = useAppDispatch()

  return (
    <Form>
      <PlansList>
        {plans.map(({ id, name, amount, currency }) => (
          <PlanItem key={id}>
            <input
              type="radio"
              name="quiz"
              value={id}
              checked={selectedPlan === id}
              onChange={(e) => dispatch(setSelectedPlan(e.target.value))}
            />
            <span>{name}</span>
            <span>
              {amount / 100}
              {currency}
            </span>
          </PlanItem>
        ))}
      </PlansList>
      <Button type="button" onClick={() => dispatch(createPaymentIntent())}>
        Submit
      </Button>
    </Form>
  )
}

const PlansList = styled.div`
  display: flex;
  justify-content: space-between;
`

const PlanItem = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100px;
  height: 100px;

  background-color: ${({ theme }) => theme.colors.surface};

  border-radius: ${({ theme }) => theme.radius.md};
`
