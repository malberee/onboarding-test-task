import { Link } from 'react-router'
import styled from 'styled-components'

import { routes } from '@/constants'

export const SuccessScreen = () => {
  return (
    <Wrapper>
      <h1>Success! ✅</h1>
      <Link to={routes.checkout}>Go to checkout again</Link>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
