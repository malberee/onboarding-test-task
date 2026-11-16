export const PLANS = [
  { id: 'weekly', name: '1 week', amount: 699, currency: 'eur', period: 'week' },
  { id: 'monthly', name: '1 month', amount: 1499, currency: 'eur', period: 'month', popular: true },
  { id: 'yearly', name: '1 year', amount: 4999, currency: 'eur', period: 'year' },
]

export const findPlan = (id) => PLANS.find((plan) => plan.id === id)
