import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router'
import { PersistGate } from 'redux-persist/es/integration/react'
import { ThemeProvider } from 'styled-components'

import { Layout } from '@/components'
import { theme } from '@/constants'
import { persistor, store } from '@/store'

import App from './App.tsx'
import { GlobalStyles } from './global-styles.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<App />} />
              </Route>
            </Routes>
            <GlobalStyles />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
