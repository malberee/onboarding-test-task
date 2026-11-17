import { Navigate, useLocation } from 'react-router'

import { screenRegistry } from './constants'
import { useAppSelector } from './hooks'

export const InitialRedirect = () => {
  const screens = useAppSelector((state) => state.flow.screens)
  const location = useLocation()

  const firstScreen = screens.find((screen) => screen in screenRegistry)

  return firstScreen ? (
    <Navigate
      to={{
        pathname: screenRegistry[firstScreen as keyof typeof screenRegistry],
        search: location.search,
      }}
      replace
    />
  ) : (
    <p>No available screens in this flow.</p>
  )
}
