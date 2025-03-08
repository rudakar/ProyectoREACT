// DashboardLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import MenuCabecera from '../menu/header/Header';

const Navbar = () => {
  return (
    <>
      <MenuCabecera />
      <Outlet />
    </>
  );
};

export default Navbar;