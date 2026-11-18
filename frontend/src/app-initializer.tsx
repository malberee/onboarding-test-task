import { useEffect, type PropsWithChildren } from 'react'
import { useSearchParams } from 'react-router'

import { useAppDispatch, useAppSelector } from './hooks'
import { FetchStatus, FlowName } from './services/api'
import { fetchFlow } from './store'

export const AppInitializer = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch()
  const { status, error } = useAppSelector((state) => state.flow)

  const [params] = useSearchParams()
  const flowName = (params.get('flow') || FlowName.DEFAULT) as FlowName

  useEffect(() => {
    if (status === FetchStatus.IDLE) {
      dispatch(fetchFlow(flowName))
    }
  }, [dispatch, flowName, status])

  return status === FetchStatus.SUCCEEDED ? (
    children
  ) : (
    <main>
      <p>{FetchStatus.FAILED ? error : 'Loading...'}</p>
    </main>
  )
}
