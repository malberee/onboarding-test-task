import type { InputHTMLAttributes } from 'react'
import styled from 'styled-components'

export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return <StyledInput {...props} />
}

const StyledInput = styled.input`
  padding-inline: ${({ theme }) => theme.spacing.lg};
  padding-block: ${({ theme }) => theme.spacing.sm};

  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.foreground};

  border-radius: ${({ theme }) => theme.radius.md};
  border: 0;

  font-size: ${({ theme }) => theme.typography.fontSize.md};

  transition: all 100ms ease-in-out;

  &:hover,
  &:focus {
    opacity: 0.9;
  }
`
