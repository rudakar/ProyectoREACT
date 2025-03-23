import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, Typography, TextField, IconButton, Button, Tooltip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import "./Perfil.css";

import { getDatabase, ref, set, get } from "firebase/database";
import { useAuth } from "../../service/firebaseAuth";
import { useCart } from "../../service/CartContext";

const Perfil = () => {
  const { user, signout } = useAuth();
  const [address, setAddress] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const { clearCart } = useCart();

  // Al montar, se obtiene la dirección del perfil almacenada en la base de datos
  useEffect(() => {
    async function fetchProfile() {
      if (user) {
        try {
          const db = getDatabase();
          const snapshot = await get(ref(db, "perfil/" + user.uid));
          if (snapshot.exists()) {
            const data = snapshot.val();
            setAddress(data.address || "");
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
    }
    fetchProfile();
  }, [user]);

  // Guarda la dirección actual en la base de datos
  const handleSave = async () => {
    if (user) {
      try {
        const db = getDatabase();
        await set(ref(db, "perfil/" + user.uid), { address });
        setIsEditing(false);
      } catch (error) {
        console.error("Error saving profile:", error);
      }
    }
  };

  // Elimina la cuenta del usuario (operación sensible, se requiere que el usuario haya iniciado sesión recientemente)
  const handleDeleteAccount = async () => {
    try {
      if (user) {
        await user.delete();
        clearCart();            // Limpia el carrito
        await signout();        // Asegura limpieza en contextos
        navigate("/login");     // Redirige al login
      }
    } catch (error) {
      console.error("Error eliminando la cuenta:", error.message);
      // Puedes mostrar un mensaje de error al usuario si quieres
    }
  };

  return (
    <Box className="perfil-container">
      <Card className="perfil-card">
        <CardContent>
          <Typography variant="h5" className="perfil-title">
            Perfil de Usuario
          </Typography>
          <Typography variant="body1" className="perfil-email">
            {user?.email}
          </Typography>
          <Box className="perfil-address-container">
            <TextField
              label="Dirección por defecto"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              fullWidth
              disabled={!isEditing}
              variant="outlined"
            />
            <Tooltip title="Modificar Dirección">
              <IconButton onClick={() => setIsEditing(!isEditing)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            {isEditing && (
              <Button variant="contained" color="primary" onClick={handleSave}>
                Guardar
              </Button>
            )}
          </Box>
          <Box className="perfil-delete-container">
            <Button variant="contained" color="error" onClick={handleDeleteAccount}>
              Eliminar Usuario
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Perfil;
