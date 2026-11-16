import { apiRequest } from './client'
import { apiEndpoints } from './constants'
import type { AppConfig } from './types'

export const getConfig = () => {
  return apiRequest<AppConfig>(apiEndpoints.config)
}
