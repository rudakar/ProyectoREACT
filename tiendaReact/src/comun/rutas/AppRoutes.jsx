import { Routes, Route } from 'react-router-dom';
import Login from '../../componentes/login/Login';
import ProtectedRoute from './ProtectedRoute';
import Home from '../../componentes/home/Home';

import Navbar from './Navbar';
const AppRoutes =()=>{
    return(
        <Routes>
      
      <Route path="/login" element={<Login />} />

      {/* Rutas protegidas */}
      <Route element={<ProtectedRoute />}>
        {/* Layout que incluye la barra de navegación */}
        <Route element={<Navbar/>}>
          <Route path="/home" element={<Home />} />
          
          
          <Route path="*" element={<Home />} />
        </Route>
      </Route>
    </Routes>
    );
}
export default AppRoutes;