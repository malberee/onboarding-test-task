import styled from 'styled-components'

import { Button } from '@/components'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { setSelectedPlan } from '@/store'

// temp
const PLANS = [
  {
    id: 'weekly',
    name: '1 week',
    amount: 699,
    currency: 'eur',
    period: 'week',
  },
  {
    id: 'monthly',
    name: '1 month',
    amount: 1499,
    currency: 'eur',
    period: 'month',
    popular: true,
  },
  {
    id: 'yearly',
    name: '1 year',
    amount: 4999,
    currency: 'eur',
    period: 'year',
  },
]

export const CheckoutScreen = () => {
  const selectedPlan = useAppSelector((state) => state.onboarding.selectedPlan)
  const dispatch = useAppDispatch()

  return (
    <Form>
      <PlansList>
        {PLANS.map(({ id, name }) => (
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
