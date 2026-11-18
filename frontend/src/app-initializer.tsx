import { useEffect, type PropsWithChildren } from 'react'
import { useSearchParams } from 'react-router'

import { Button, Container } from './components'
import { useAppDispatch, useAppSelector } from './hooks'
import { FetchStatus, FlowName } from './services/api'
import { fetchFlow } from './store'

export const AppInitializer = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch()
  const { status } = useAppSelector((state) => state.flow)

  const [params] = useSearchParams()
  const flowName = (params.get('flow') || FlowName.DEFAULT) as FlowName

  useEffect(() => {
    if (status !== FetchStatus.LOADING && status !== FetchStatus.SUCCEEDED) {
      dispatch(fetchFlow(flowName))
    }
  }, [dispatch, flowName, status])

  return status === FetchStatus.SUCCEEDED ? (
    children
  ) : (
    <main>
      <Container>
        <p>
          {status === FetchStatus.FAILED
            ? 'The page could not be loaded'
            : 'Loading...'}
        </p>
        <Button onClick={() => window.location.reload()}>Try again</Button>
      </Container>
    </main>
  )
}
