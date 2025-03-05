import React, { useState, useEffect, useContext, createContext } from "react";
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import Configuration from "../components/configuration/conf";

// Inicializar Firebase con la configuración (podrías usar variables de entorno)
const firebaseApp = initializeApp(Configuration.real_time_database);
const authFirebase = getAuth(firebaseApp);

// Crear contexto para la autenticación
const AuthContext = createContext();

// Hook para acceder al contexto de autenticación
export function useAuth() {
  return useContext(AuthContext);
}

// Provider para la autenticación
export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

// Hook que maneja la lógica de autenticación
function useProvideAuth() {
  const [user, setUser] = useState(null);

  // Escucha los cambios en la autenticación para mantener el estado sincronizado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authFirebase, (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        // Guarda solo la información que necesites
        localStorage.setItem("user", JSON.stringify(firebaseUser));
      } else {
        localStorage.removeItem("user");
      }
    });
    return () => unsubscribe();
  }, []);

  const signin = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(authFirebase, email, password);
      setUser(response.user);
      localStorage.setItem("user", JSON.stringify(response.user));
      return response.user;
    } catch (error) {
      console.error("Error en signIn:", error);
      return error.message;
    }
  };

  const signup = async (email, password) => {
    try {
      const response = await createUserWithEmailAndPassword(authFirebase, email, password);
      setUser(response.user);
      localStorage.setItem("user", JSON.stringify(response.user));
      return response.user;
    } catch (error) {
      console.error("Error en signUp:", error);
      return error.message;
    }
  };

  const signout = async () => {
    try {
      await signOut(authFirebase);
      setUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Error en signOut:", error);
    }
  };

  return {
    user,
    signin,
    signup,
    signout,
  };
}
