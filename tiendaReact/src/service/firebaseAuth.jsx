import React, { useState, useEffect, useContext, createContext } from "react";
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import Configuration from "../config/Configuration";


const firebaseApp = initializeApp(Configuration.real_time_database);
const authFirebase = getAuth(firebaseApp);

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

function useProvideAuth() {
  const initialUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authFirebase, (firebaseUser) => {
      setUser(firebaseUser);

      
      if (firebaseUser) {
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
      return error.message;
    }
  };

  const signout = async () => {
    try {
      await signOut(authFirebase);
      setUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      console.error(error);
    }
  };

  return {
    user,
    signin,
    signup,
    signout,
  };
}