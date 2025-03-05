import React, { useState } from "react";
import { Box, Paper, Typography, TextField, Button, Slide } from "@mui/material";
import { useAuth } from "../../service/firebaseAuth.jsx"; // Asegúrate de que la ruta sea la correcta
import "./login.css";

const Login = () => {
  const auth = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(null);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setSuccess(null); // Limpiar mensaje al cambiar formulario
  };

  const onUserChange = ({ target: { value } }) => {
    setUser(value);
  };

  const onPassChange = ({ target: { value } }) => {
    setPassword(value);
  };

  async function signin() {
    const response = await auth.signin(user, password);
    setSuccess(response);
  }

  async function signup() {
    const response = await auth.signup(user, password);
    setSuccess(response);
  }

  return (
    <Box className="login-container">
      <Paper className="login-paper">
        <Typography variant="h4" gutterBottom className="login-title">
          {isLogin ? "Bienvenido a la Tienda Mágica" : "Regístrate en la Tienda Mágica"}
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
                  value={user}
                  onChange={onUserChange}
                />
                <TextField
                  fullWidth
                  label="Contraseña"
                  margin="normal"
                  variant="outlined"
                  type="password"
                  value={password}
                  onChange={onPassChange}
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={signin}
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
                {/* Si lo deseas, puedes agregar aquí otros campos, por ejemplo nombre o confirmar contraseña */}
                <TextField
                  fullWidth
                  label="Correo"
                  margin="normal"
                  variant="outlined"
                  value={user}
                  onChange={onUserChange}
                />
                <TextField
                  fullWidth
                  label="Contraseña"
                  margin="normal"
                  variant="outlined"
                  type="password"
                  value={password}
                  onChange={onPassChange}
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={signup}
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

        {/* Mensaje de respuesta */}
        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          {success !== null ? success : ""}
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
