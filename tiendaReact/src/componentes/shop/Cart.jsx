import React, { useEffect } from 'react';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemAvatar, 
  Avatar, 
  ListItemText, 
  IconButton, 
  Divider, 
  Button,
  Tooltip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../../service/CartContext';
import { Link } from 'react-router-dom';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  useEffect(() => {
    console.log("Cart actualizado:", cart);
  }, [cart]);

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Box className="cart-container">
      <Typography variant="h5" className="cart-title">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <span>Carrito de Compras</span>
          <Tooltip title="Vaciar Carrito">
            <IconButton onClick={clearCart} color="primary">
              <RemoveShoppingCartIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Typography>

      <Divider />
      {cart.length === 0 ? (
        <Typography variant="body1" className="cart-empty">El carrito está vacío</Typography>
      ) : (
        <List>
          {cart.map(item => (
            <ListItem key={item.id} className="cart-item">
              <ListItemAvatar>
                <Avatar src={item.image} alt={item.title} />
              </ListItemAvatar>
              <ListItemText 
                primary={item.title} 
                secondary={`Cantidad: ${item.quantity} - Precio: ${item.price}€`} 
              />
              <IconButton edge="end" onClick={() => removeFromCart(item.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}
      <Divider />
      <Box className="cart-footer">
        <Typography variant="h6">Total: {totalPrice.toFixed(2)}€</Typography>
        {cart.length > 0 && (
          <Box className="cart-buttons">
            
            <Button variant="contained" color="secondary" component={Link} to="/checkout">
              Continuar Compra
            </Button>
            
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Cart;
