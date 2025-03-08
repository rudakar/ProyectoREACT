import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import logo from '../../../assets/icono.png';
import "./Header.css";
import NavigationMenu from "../nav/NavigationMenu";
import PersonIcon from "@mui/icons-material/Person";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";
const MenuCabecera = ({ onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleUserMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleUserMenuClose();
    if (onLogout) onLogout();
  };

  return (
    <AppBar position="static" className="header-appbar">
      <Toolbar className="header-toolbar">
        {/* Top row: distribución en tres columnas */}
        <Box className="top-row">
          {/* Izquierda: Ícono */}
          <Box className="top-left">
          
              <img src={logo} alt="SHOP" className="logo-image" />
           
          </Box>
          {/* Centro: Nombre de la tienda */}
          <Box className="top-center">
            
            <Typography variant="h2" className="header-store-name" noWrap>
            <AutoAwesomeIcon className="header-logo-icon" />Cámara de los Artefactos<AutoAwesomeIcon className="header-logo-icon" />
            </Typography>
          </Box>
          {/* Derecha: Íconos de carrito y usuario */}
          <Box className="top-right">
            <IconButton color="inherit" className="header-icon-button cart-icon-container">
              <ShoppingCartIcon className="cart-icon" />
            </IconButton>
            <IconButton color="inherit" onClick={handleUserMenuOpen} className="header-icon-button">
              <AccountCircle className="user-icon" />
            </IconButton>
          </Box>
        </Box>

        {/* Componente para el menú de navegación */}
        
      </Toolbar>
      <NavigationMenu/>
      {/* Menú desplegable del usuario */}
      <Menu
  anchorEl={anchorEl}
  open={Boolean(anchorEl)}
  onClose={handleUserMenuClose}
  anchorOrigin={{
    vertical: "bottom",
    horizontal: "right",
  }}
  transformOrigin={{
    vertical: "top",
    horizontal: "right",
  }}
  ModalProps={{
    disableScrollLock: true,
  }}
  PaperProps={{
    className: "magical-menu",
  }}
>
  <MenuItem onClick={handleUserMenuClose} className="magical-menu-item">
    <PersonIcon className="menu-icon" />
    Mi Perfil
  </MenuItem>
  <MenuItem onClick={handleUserMenuClose} className="magical-menu-item">
    <HistoryIcon className="menu-icon" />
    Historial
  </MenuItem>
  <MenuItem onClick={handleUserMenuClose} className="magical-menu-item">
    <ShoppingCartIcon className="menu-icon" />
    Mi Carrito
  </MenuItem>
  <MenuItem onClick={handleLogout} className="magical-menu-item">
    <LogoutIcon className="menu-icon" />
    Log Out
  </MenuItem>
</Menu>



    </AppBar>
  );
};

export default MenuCabecera;
