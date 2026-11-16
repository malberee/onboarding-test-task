import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import { ThemeProvider } from 'styled-components'

import { theme } from '@/constants'
import { persistor, store } from '@/store'

import App from './App.tsx'
import { GlobalStyles } from './global-styles.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <App />
          <GlobalStyles />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
