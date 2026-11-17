import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { getFlow, type Flow, type FlowName } from '@/services/api'

interface FlowState {
  name: string | null
  screens: string[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: FlowState = {
  name: null,
  screens: [],
  status: 'idle',
  error: null,
}

export const fetchFlow = createAsyncThunk<
  Flow,
  FlowName,
  { state: { flow: FlowState } }
>(
  'flow/fetchFlow',
  async (name) => {
    return getFlow(name)
  },
  {
    condition: (_, { getState }) => {
      const { status } = getState().flow

      return status === 'idle' || status === 'failed'
    },
  },
)

const flowSlice = createSlice({
  name: 'flow',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchFlow.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchFlow.fulfilled, (state, action) => {
        state.name = action.payload.name
        state.screens = action.payload.screens
        state.status = 'succeeded'
      })
      .addCase(fetchFlow.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Failed to load flow'
      }),
})

export default flowSlice.reducer
