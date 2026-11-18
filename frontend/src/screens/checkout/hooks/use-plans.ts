import { useEffect, useState } from 'react'

import { getPlans, type Plan } from '@/services/api'

export const usePlans = () => {
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

  return {
    plans,
    isLoading,
    isError,
  }
}
