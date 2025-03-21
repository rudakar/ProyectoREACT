import { Routes, Route } from 'react-router-dom';
import Login from '../../componentes/login/Login';
import ProtectedRoute from './ProtectedRoute';
import Home from '../../componentes/home/Home';

import Navbar from './Navbar';
import Expositor from '../../componentes/expositor/Expositor';
import Cart from '../../componentes/shop/Cart';
import Checkout from '../../componentes/shop/Checkout';
import Historial from '../../componentes/historial/Historial';
import Perfil from '../perfil/Perfil';
const AppRoutes =()=>{
    return(
        <Routes>
      
      <Route path="/login" element={<Login />} />

      {/* Rutas protegidas */}
      <Route element={<ProtectedRoute />}>
        {/* Layout que incluye la barra de navegación */}
        <Route element={<Navbar/>}>
          <Route path="/home" element={<Home />} />
          <Route path="/exp" element={<Expositor category="explorar" />} />
          <Route path="/exp/:category" element={<Expositor />} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/historial" element={<Historial/>} />
          <Route path="/profile" element={<Perfil/>} />
          
          <Route path="*" element={<Home />} />
        </Route>
      </Route>
    </Routes>
    );
}
export default AppRoutes;