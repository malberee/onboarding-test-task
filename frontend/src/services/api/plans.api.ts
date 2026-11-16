import { apiRequest } from './client'
import { apiEndpoints } from './constants'
import type { PlansResponse } from './types'

export const getPlans = () => {
  return apiRequest<PlansResponse>(apiEndpoints.plans)
}
