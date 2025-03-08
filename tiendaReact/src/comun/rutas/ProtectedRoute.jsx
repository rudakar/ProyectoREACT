import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../service/firebaseAuth';


const ProtectedRoute = () => {
  const { user } = useAuth();
  
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
