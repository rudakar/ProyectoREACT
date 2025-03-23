import React, { useEffect, useRef, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Menu,
  MenuItem,
  Badge,
  Popover,
  Slide
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
import { Link } from "react-router-dom";
import { useCart } from "../../../service/CartContext";
import { useAuth } from "../../../service/firebaseAuth";
const MenuCabecera = ({ onLogout }) => {
  const auth = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const { cart ,lastUpdated ,clearCart } = useCart();
  const [animateCart, setAnimateCart] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [popoverContent, setPopoverContent] = useState("");
  const cartRef = useRef(null);

  const badgeCount = cart.length;
  useEffect(() => {
    if (cart.length > 0) {
      setAnimateCart(true);
      const timer = setTimeout(() => setAnimateCart(false), 500);
      return () => clearTimeout(timer);
    }
  }, [cart]);
  useEffect(() => {
    if (lastUpdated) {
      const content = {
        title: lastUpdated.title || "Artículo eliminado",
        quantity: lastUpdated.quantity !== undefined ? lastUpdated.quantity : 0,
        image: lastUpdated.image || null,
        action: lastUpdated.action
      };
      setPopoverContent(content);
      setPopoverOpen(true);
      const timer = setTimeout(() => setPopoverOpen(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [lastUpdated]);
  


  const handleUserMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleUserMenuClose();
    await auth.signout();
    clearCart();
    if (onLogout) onLogout();
  };

  return (
  

      <div className="header-toolbar">
      
        <Box className="top-row">
     
          <Box className="top-left" >
              <Link component={Link} to={"/home"}>
                <img src={logo} alt="SHOP" className="logo-image" />
              </Link>
          </Box>
  
          <Box className="top-center">
            
            <Typography variant="h2" className="header-store-name" noWrap component={Link} to={"/home"} sx={{ textDecoration: "none" }}>
            <AutoAwesomeIcon className="header-logo-icon" />Cámara de los Artefactos<AutoAwesomeIcon className="header-logo-icon" />
            </Typography>
          </Box>
     
          <Box className="top-right" >
            <IconButton component={Link} to="/cart" color="inherit" className="header-icon-button cart-icon-container">
              <Badge
                badgeContent={badgeCount}
                color="primary"
                invisible={badgeCount === 0}
                className="custom-badge"
              >
                <ShoppingCartIcon className={`cart-icon ${animateCart ? 'bounce' : ''}`} />
              </Badge>
            </IconButton>
            <IconButton color="inherit" onClick={handleUserMenuOpen} className="header-icon-button">
              <AccountCircle className="user-icon" />
            </IconButton>
          </Box>
        </Box>
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
          <MenuItem onClick={handleUserMenuClose} component={Link} to="/profile"	className="magical-menu-item">
            <PersonIcon className="menu-icon" />
            Mi Perfil
          </MenuItem>
          <MenuItem component={Link} to="/historial" onClick={handleUserMenuClose} className="magical-menu-item">
            <HistoryIcon  className="menu-icon" />
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
        <Popover
          open={popoverOpen}
          anchorEl={cartRef.current}
          onClose={() => setPopoverOpen(false)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          TransitionComponent={Slide}
          TransitionProps={{ direction: "down" }}
          ModalProps={{
            hideBackdrop: true, // Deshabilita el overlay
            disableScrollLock: true,
            disableEnforceFocus: true,
            disableAutoFocus: true,          // No forzar autoenfoque
            disableRestoreFocus: true        // No restaurar el foco automáticamente
          }}
          PaperProps={{
            sx: { ml: '-8%' }  // Mueve 20px a la izquierda
          }}
        >
          <Box sx={{p: 1, display: 'flex', alignItems: 'center', gap: 1  }}>
          {popoverContent.image && (
              <img
                src={popoverContent.image}
                alt={popoverContent.title}
                style={{ width: 30, height: 30, borderRadius: '50%' }}
              />
            )}
            <Typography variant="body2" sx={{ fontFamily: 'Roboto, sans-serif' }}>
              {popoverContent.action === 'add'
                ? `Añadido "${popoverContent.title}" (Cantidad: ${popoverContent.quantity})`
                : `Reducido "${popoverContent.title}" (Cantidad: ${popoverContent.quantity})`}
            </Typography>
          </Box>
        </Popover>
      </div>

  )


  ;
};

export default MenuCabecera;
