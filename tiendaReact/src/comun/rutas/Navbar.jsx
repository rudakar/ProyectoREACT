// DashboardLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import MenuCabecera from '../menu/header/Header';

const Navbar = () => {
  return (
    <>
      <div style={{display:"flex", flexDirection:"column", width:"100%", height:"100%"}}>
        <div> <MenuCabecera /></div>
        <div><Outlet /></div>
      </div>
    </>
  );
};

export default Navbar;