import { useLocation, useNavigate } from 'react-router'

import { routes } from '@/constants'

import { useAppSelector } from './use-app-selector'

export const useFlowNavigation = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const screens = useAppSelector((state) => state.flow.screens)

  const currentScreenIndex = screens.findIndex(
    (screen) => location.pathname.replace('/', '') === screen,
  )

  const next = () => {
    navigate(
      {
        pathname: routes[screens[currentScreenIndex + 1]],
        search: location.search,
      },
      { replace: true },
    )
  }

  return { next }
}
