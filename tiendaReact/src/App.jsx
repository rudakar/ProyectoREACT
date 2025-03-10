
import './App.css'
import AppRoutes from './comun/rutas/AppRoutes'
import Background from './comun/background/Background'
import { AuthProvider } from './service/firebaseAuth'
import { DatabaseProvider } from './service/firebaseDatabase'
import { CartProvider } from './service/CartContext'


function App() {
  

  return (
    <>
    <AuthProvider>
      <DatabaseProvider>
        <CartProvider>
          <Background/>
          <AppRoutes/>
        </CartProvider>
      </DatabaseProvider>
    </AuthProvider>
    </>
  )
}

export default App
