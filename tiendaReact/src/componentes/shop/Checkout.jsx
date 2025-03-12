import React, { useState } from 'react';
import {
  Box,
  Paper,
  Button,
  Stepper,
  Step,
  StepButton,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  TextField
} from '@mui/material';

import './Checkout.css';
import { useCart } from '../../service/CartContext';
import { useAuth } from '../../service/firebaseAuth';
import { useDatabase } from '../../service/firebaseDatabase';

const steps = ['Detalles de compra', 'Datos de Cliente'];

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const db = useDatabase();
  const [activeStep, setActiveStep] = useState(0);
  const [address, setAddress] = useState('');
  
  const totalPrice = cart.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);
  
  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  
  const handlePurchase = async () => {
    const order = {
      userEmail: user?.email || '',
      address,
      cart,
      total: totalPrice,
      timestamp: new Date().toISOString()
    };
    
    try {
      await db.postRequest('historial', order);
      clearCart();
      alert("¡Compra realizada con éxito!");
      setActiveStep(steps.length); // Muestra el mensaje final
    } catch (error) {
      console.error("Error al realizar la compra:", error);
      alert("Error al realizar la compra");
    }
  };
  
  return (
    <Box className="checkout-page">
      <Paper className="checkout-card" elevation={3}>
        <Typography variant="h4" className="checkout-title">
          Finalizar Compra
        </Typography>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepButton onClick={() => handleStepChange(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <Divider />
        <Box className="checkout-content">
          {activeStep === 0 && (
            <Box className="step-content">
              {cart.length === 0 ? (
                <Typography variant="body1">El carrito está vacío</Typography>
              ) : (
                <>
                  <List>
                    {cart.map(item => (
                      <ListItem key={item.id}>
                        <ListItemAvatar>
                          <Avatar src={item.image} alt={item.title} />
                        </ListItemAvatar>
                        <ListItemText 
                          primary={item.title} 
                          secondary={`Cantidad: ${item.quantity} - Precio: ${item.price}€`} 
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Divider />
                  <Typography variant="h6" className="order-total">
                    Total: {totalPrice.toFixed(2)}€
                  </Typography>
                </>
              )}
              <Box className="checkout-buttons">
                {cart.length > 0 && (
                  <Button variant="contained" onClick={() => setActiveStep(1)}>
                    Continuar
                  </Button>
                )}
              </Box>
            </Box>
          )}
          {activeStep === 1 && (
            <Box className="step-content">
              <TextField
                label="Correo"
                value={user?.email || ''}
                variant="outlined"
                fullWidth
                disabled
                sx={{ mb: 2 }}
              />
              <TextField
                label="Dirección"
                value={address}
                variant="outlined"
                fullWidth
                onChange={(e) => setAddress(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Box className="checkout-buttons">
                <Button variant="contained" onClick={handlePurchase} disabled={!address}>
                  Realizar Compra
                </Button>
                <Button onClick={() => setActiveStep(0)}>Volver</Button>
              </Box>
            </Box>
          )}
          {activeStep === steps.length && (
            <Typography variant="h6" className="checkout-complete">
              Compra realizada. Gracias por tu compra.
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Checkout;
