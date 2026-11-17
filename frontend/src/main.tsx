import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router'
import { PersistGate } from 'redux-persist/es/integration/react'
import { ThemeProvider } from 'styled-components'

import { theme } from '@/constants'
import { persistor, store } from '@/store'

import App from './App'
import { AppInitializer } from './app-initializer'
import { GlobalStyles } from './global-styles'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <AppInitializer>
              <App />
            </AppInitializer>
            <GlobalStyles />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
