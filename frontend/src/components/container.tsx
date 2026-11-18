import type { PropsWithChildren } from 'react'
import styled from 'styled-components'

export const Container = ({ children }: PropsWithChildren) => {
  return <Wrapper>{children}</Wrapper>
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};

  max-width: ${({ theme }) => theme.breakpoints.tablet};

  margin-inline: auto;
  padding: ${({ theme }) => theme.spacing.xl};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: ${({ theme }) => theme.breakpoints.desktop};
  }
`
