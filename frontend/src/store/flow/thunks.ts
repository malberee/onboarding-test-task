import { createAsyncThunk } from '@reduxjs/toolkit'

import { getFlow, type Flow, type FlowName } from '@/services/api'

import type { FlowState } from './slice'

type State = { state: { flow: FlowState } }

export const fetchFlow = createAsyncThunk<Flow, FlowName, State>(
  'flow/fetchFlow',
  async (flowName) => {
    return getFlow(flowName)
  },
  {
    condition: (_, { getState }) => {
      const { status } = getState().flow

      return status === 'idle' || status === 'failed'
    },
  },
)
