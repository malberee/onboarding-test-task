import { Link, Outlet } from 'react-router'
import styled from 'styled-components'

import { routes } from '@/constants'

import { Container } from './container'

export const Layout = () => {
  const isDev = import.meta.env.DEV

  return (
    <Container>
      {isDev && (
        <DevModeNavigation>
          <Link to={routes.phone}>phone</Link>
          <Link to={routes.email}>email</Link>
          <Link to={routes.quiz_single}>quiz single</Link>
          <Link to={routes.quiz_multi}>quiz multi</Link>
          <Link to={routes.success}>success</Link>
          <Link to={routes.checkout}>checkout</Link>
        </DevModeNavigation>
      )}
      <Outlet />
    </Container>
  )
}

const DevModeNavigation = styled.nav`
  position: fixed;
  bottom: 0;

  display: flex;
  gap: 8px;
`
