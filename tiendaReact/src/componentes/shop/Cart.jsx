// Cart.jsx
import React from 'react';
import { Box, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton, Divider, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './Cart.css';
import { useCart } from '../../service/CartContext';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Box className="cart-container">
      <Typography variant="h5" className="cart-title">Carrito de Compras</Typography>
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
                secondary={`Cantidad: ${item.quantity} - Precio: $${item.price}`} 
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
        <Typography variant="h6">Total: ${totalPrice.toFixed(2)}</Typography>
        <Button variant="contained" color="primary" onClick={clearCart}>
          Vaciar Carrito
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;
