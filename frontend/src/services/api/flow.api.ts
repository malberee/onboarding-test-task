import { apiRequest } from './client'
import { apiEndpoints } from './constants'
import { type Flow, FlowName } from './types'

export const getFlow = (name: FlowName = FlowName.DEFAULT) => {
  return apiRequest<Flow>(`${apiEndpoints.flow}?name=${name}`)
}
