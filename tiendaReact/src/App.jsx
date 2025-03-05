
import './App.css'
import AppRoutes from './comun/AppRoutes'
import Background from './comun/background/Background'
import { AuthProvider } from './service/firebaseAuth'


function App() {
  

  return (
    <>
    <AuthProvider>
      <Background/>
      <AppRoutes/>
    </AuthProvider>
    </>
  )
}

export default App
