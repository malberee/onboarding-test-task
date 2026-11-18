import { createSlice } from '@reduxjs/toolkit'

import { screenRegistry } from '@/constants'
import { FetchStatus, FlowName } from '@/services/api'

import { fetchFlow } from './thunks'

export interface FlowState {
  name: FlowName
  screens: (keyof typeof screenRegistry)[]
  status: FetchStatus
  error: string | null
}

const initialState: FlowState = {
  name: FlowName.DEFAULT,
  screens: [],
  status: FetchStatus.IDLE,
  error: null,
}

const flowSlice = createSlice({
  name: 'flow',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchFlow.pending, (state) => {
        state.status = FetchStatus.LOADING
        state.error = null
      })
      .addCase(fetchFlow.fulfilled, (state, action) => {
        state.status = FetchStatus.SUCCEEDED
        state.name = action.payload.name as FlowName
        state.screens = action.payload
          .screens as (keyof typeof screenRegistry)[]
      })
      .addCase(fetchFlow.rejected, (state, action) => {
        state.status = FetchStatus.FAILED
        state.error = action.error.message ?? 'Failed to load flow'
      }),
})

export const flowReducer = flowSlice.reducer
