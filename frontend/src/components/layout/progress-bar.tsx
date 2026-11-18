import { useLocation } from 'react-router'
import styled from 'styled-components'

import { useAppSelector } from '@/hooks'

export const ProgressBar = () => {
  const screens = useAppSelector((state) => state.flow.screens)
  const { pathname } = useLocation()

  const currentScreenIndex = screens.findIndex(
    (screen) => screen === pathname.replace('/', ''),
  )
  const totalScreens = screens.length - 1
  const progressPercentage =
    totalScreens > 0 ? (currentScreenIndex / totalScreens) * 100 : 0

  return (
    <Track>
      <Indicator style={{ width: `${progressPercentage}%` }} />
    </Track>
  )
}

const Track = styled.div`
  width: 100%;
  height: 10px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 5px;
`

const Indicator = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.accent};
  border-radius: 5px;
`
