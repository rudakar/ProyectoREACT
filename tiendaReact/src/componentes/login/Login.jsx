import React, { useState } from "react";
import "./login.css";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Slide,
} from "@mui/material";

// Recuerda instalar @mui/material y sus dependencias
// npm install @mui/material @emotion/react @emotion/styled

//eu
const Login= () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Box className="login-container">
      <Paper className="login-paper">
        <Typography variant="h4" gutterBottom className="login-title">
          {isLogin
            ? "Bienvenido a la Tienda Mágica"
            : "Regístrate en la Tienda Mágica"}
        </Typography>

        {/* Formulario de Login */}
        <Slide direction="up" in={isLogin} mountOnEnter unmountOnExit>
          <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
            {isLogin && (
              <>
                <TextField
                  fullWidth
                  label="Correo"
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Contraseña"
                  margin="normal"
                  variant="outlined"
                  type="password"
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Iniciar Sesión
                </Button>
              </>
            )}
          </Box>
        </Slide>

        {/* Formulario de Registro */}
        <Slide direction="up" in={!isLogin} mountOnEnter unmountOnExit>
          <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
            {!isLogin && (
              <>
                <TextField
                  fullWidth
                  label="Nombre Completo"
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Correo"
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Contraseña"
                  margin="normal"
                  variant="outlined"
                  type="password"
                />
                <TextField
                  fullWidth
                  label="Confirmar Contraseña"
                  margin="normal"
                  variant="outlined"
                  type="password"
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Registrarse
                </Button>
              </>
            )}
          </Box>
        </Slide>

        {/* Botón para cambiar entre formularios */}
        <Button onClick={toggleForm} sx={{ mt: 2 }}>
          {isLogin
            ? "¿No tienes cuenta? Regístrate"
            : "¿Ya tienes cuenta? Inicia Sesión"}
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
