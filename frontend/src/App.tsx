import './App.css'
import { useAppDispatch, useAppSelector } from './hooks'
import { setEmail } from './store'

function App() {
  const email = useAppSelector((state) => state.onboarding.email)
  const dispatch = useAppDispatch()

  return (
    <main>
      <p>Email: {email || 'Not set'}</p>
      <button onClick={() => dispatch(setEmail('test@example.com'))}>
        Set email
      </button>
    </main>
  )
}

export default App
