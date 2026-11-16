import { apiRequest } from './client'
import { apiEndpoints, flowName } from './constants'
import type { Flow, FlowName } from './types'

export const getFlow = (name: FlowName = flowName.DEFAULT) => {
  return apiRequest<Flow>(`${apiEndpoints.flow}?name=${name}`)
}
