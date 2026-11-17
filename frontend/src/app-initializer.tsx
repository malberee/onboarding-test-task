import { useEffect, type PropsWithChildren } from 'react'
import { useSearchParams } from 'react-router'

import { useAppDispatch, useAppSelector } from './hooks'
import type { FlowName } from './services/api'
import { fetchFlow } from './store'

export const AppInitializer = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch()
  const { status, error } = useAppSelector((state) => state.flow)

  const [params] = useSearchParams()
  const flowName = (params.get('flow') || 'default') as FlowName

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchFlow(flowName))
    }
  }, [dispatch, flowName, status])

  return status === 'succeeded' ? (
    children
  ) : (
    <main>
      <p>{status === 'failed' ? error : 'loading...'}</p>
    </main>
  )
}
