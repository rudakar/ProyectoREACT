import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  List,
  Paper,
  Divider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { useDatabase } from '../../service/firebaseDatabase';
import { useAuth } from '../../service/firebaseAuth';
import './Historial.css';

const Historial = () => {
  const db = useDatabase();
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados para filtros: fecha y orden
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [orderByDate, setOrderByDate] = useState('desc'); // 'desc' = más reciente primero

  useEffect(() => {
    async function fetchOrders() {
      try {
        const snapshot = await db.getRequest('historial');
        if (snapshot.exists()) {
          const data = snapshot.val();
          // Convertir el objeto en un array de pedidos
          const ordersArray = Object.keys(data).map(key => ({
            id: key,
            ...data[key],
          }));
          // Filtrar pedidos del usuario autenticado
          const userEmail = user?.email;
          const userOrders = ordersArray.filter(order => order.userEmail === userEmail);
          setOrders(userOrders);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error("Error fetching historial:", error);
      } finally {
        setLoading(false);
      }
    }
    if (user) {
      fetchOrders();
    }
  }, [db, user]);

  // Filtrar y ordenar pedidos según las fechas y la opción seleccionada
  const filteredOrders = orders.filter(order => {
    const orderDate = new Date(order.timestamp);
    if (startDate) {
      const sDate = new Date(startDate);
      if (orderDate < sDate) return false;
    }
    if (endDate) {
      const eDate = new Date(endDate);
      if (orderDate > eDate) return false;
    }
    return true;
  }).sort((a, b) => {
    const dateA = new Date(a.timestamp);
    const dateB = new Date(b.timestamp);
    return orderByDate === 'asc' ? dateA - dateB : dateB - dateA;
  });

  return (
    <Box className="historial-container">
      <Typography variant="h4" className="historial-title">
        Historial de Pedidos
      </Typography>

      {/* Filtro de historial */}
      <Box className="historial-filter-container">
        <TextField 
          label="Fecha Inicio" 
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField 
          label="Fecha Fin" 
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <FormControl variant="outlined" className="order-date-formcontrol">
          <InputLabel id="order-date-label">Ordenar por fecha</InputLabel>
          <Select
            labelId="order-date-label"
            label="Ordenar por fecha"
            value={orderByDate}
            onChange={(e) => setOrderByDate(e.target.value)}
          >
            <MenuItem value="desc">Más reciente primero</MenuItem>
            <MenuItem value="asc">Más antigua primero</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {loading ? (
        <Typography variant="h6">Cargando historial...</Typography>
      ) : filteredOrders.length === 0 ? (
        <Typography variant="body1" className="historial-empty">
          No tienes pedidos en tu historial.
        </Typography>
      ) : (
        <List className="historial-list">
          {filteredOrders.map(order => (
            <Paper key={order.id} className="order-card" elevation={3}>
              <Box className="order-card-header">
                <Typography variant="subtitle1">
                  Pedido realizado el: {new Date(order.timestamp).toLocaleString()}
                </Typography>
              </Box>
              <Divider />
              <Box className="order-card-body">
                <Typography variant="body2">Total: {order.total}€</Typography>
                <Typography variant="body2">Dirección: {order.address}</Typography>
                <Typography variant="body2">
                  Artículos: {order.cart && order.cart.map(item => `${item.title} (x${item.quantity})`).join(', ')}
                </Typography>
              </Box>
            </Paper>
          ))}
        </List>
      )}
    </Box>
  );
};

export default Historial;
