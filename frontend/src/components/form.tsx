import styled from 'styled-components'

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};

  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints.mobile};
`
