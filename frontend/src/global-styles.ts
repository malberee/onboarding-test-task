import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: 16px;
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
    color: ${({ theme }) => theme.colors.foreground};
    background: ${({ theme }) => theme.colors.background};
  }

  body {
    margin: 0;
    min-width: 320px;
    min-height: 100vh;
  }

  button,
  input,
  textarea,
  select {
    font: inherit;
  }

  button {
    cursor: pointer;
    background: none;
    border: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  #root {
    min-height: 100vh;
  }
`
