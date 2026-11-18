import { Route, Routes } from 'react-router'

import { Layout } from './components'
import { routes } from './constants'
import { InitialRedirect } from './initial-redirect'
import {
  CheckoutScreen,
  EmailScreen,
  PhoneScreen,
  QuizMultiScreen,
  QuizSingleScreen,
  SuccessScreen,
} from './screens'

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<InitialRedirect />} />
          <Route path={routes.phone} element={<PhoneScreen />} />
          <Route path={routes.email} element={<EmailScreen />} />
          <Route path={routes.quiz_single} element={<QuizSingleScreen />} />
          <Route path={routes.quiz_multi} element={<QuizMultiScreen />} />
          <Route path={routes.checkout} element={<CheckoutScreen />} />
          <Route path={routes.success} element={<SuccessScreen />} />
        </Route>
      </Routes>
    </main>
  )
}

export default App
