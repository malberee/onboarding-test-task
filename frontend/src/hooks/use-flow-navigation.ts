import { useCallback, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router'

import { routes } from '@/constants'
import { useAppSelector } from '@/hooks'

type ScreenKey = keyof typeof routes

export const useFlowNavigation = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const screens = useAppSelector((state) => state.flow.screens)

  const currentScreen = useMemo(
    () =>
      (Object.keys(routes) as ScreenKey[]).find(
        (screen) => routes[screen] === location.pathname,
      ),
    [location.pathname],
  )

  const currentIndex = currentScreen ? screens.indexOf(currentScreen) : -1

  const nextScreen = screens
    .slice(currentIndex + 1)
    .find((screen): screen is ScreenKey => screen in routes)

  const navigateToScreen = useCallback(
    (screen: ScreenKey) => {
      navigate(
        {
          pathname: routes[screen],
          search: location.search,
        },
        { replace: true },
      )
    },
    [location.search, navigate],
  )

  const next = useCallback(() => {
    if (nextScreen) {
      navigateToScreen(nextScreen)
    }
  }, [nextScreen, navigateToScreen])

  return {
    next,
    currentScreen,
  }
}
