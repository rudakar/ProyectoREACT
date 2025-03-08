import React, { useState } from "react";
import { Box, Paper, Typography, TextField, Button, Slide } from "@mui/material";
import { useAuth } from "../../service/firebaseAuth.jsx"; // Asegúrate de que la ruta sea la correcta
import "./login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate(); 
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrorMsg(null); // Limpiar mensaje de error al cambiar de formulario
  };

  const onUserChange = ({ target: { value } }) => {
    setUser(value);
  };

  const onPassChange = ({ target: { value } }) => {
    setPassword(value);
  };

  async function signin() {
    const response = await auth.signin(user, password);
    // Si la respuesta es un objeto (login exitoso), redirige a otra ruta, por ejemplo, "/dashboard"
    if (typeof response === "object") {
      navigate("/home");
    } else {
      setErrorMsg(response);
    }
  }

  async function signup() {
    const response = await auth.signup(user, password);
    // Si el registro es exitoso, redirige a la ruta deseada
    if (typeof response === "object") {
      navigate("/dashboard");
    } else {
      setErrorMsg(response);
    }
  }

  return (
    <Box className="login-container">
      <Paper className="login-paper">
        <Typography variant="h4" gutterBottom className="login-title">
          {isLogin ? "Bienvenido a la Cámara de los Artefactos" : "Regístrate en la Cámara de los Artefactos"}
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

        {/* Mostrar mensaje de error si lo hay */}
        {errorMsg && (
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            {errorMsg}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default Login;
