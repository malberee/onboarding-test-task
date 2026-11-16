import { theme } from './constants'
import { PhoneScreen } from './screens'

function App() {
  return (
    <main style={{ backgroundColor: theme.colors.background }}>
      <PhoneScreen />
    </main>
  )
}

export default App
