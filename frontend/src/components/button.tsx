import type { ButtonHTMLAttributes } from 'react'
import styled from 'styled-components'

export const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <StyledButton {...props} />
}

const StyledButton = styled.button`
  padding-inline: ${({ theme }) => theme.spacing.lg};
  padding-block: ${({ theme }) => theme.spacing.sm};

  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.accentForeground};

  border-radius: ${({ theme }) => theme.radius.md};

  font-size: ${({ theme }) => theme.typography.fontSize.md};

  transition: all 100ms ease-in-out;

  &:hover,
  &:focus {
    opacity: 0.9;
  }

  &:active {
    scale: 0.98;
  }
`
