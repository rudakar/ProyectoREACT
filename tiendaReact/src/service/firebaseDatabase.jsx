import React, { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, push, remove } from "firebase/database";
import Configuration from "../components/configuration/conf";

// Inicializar Firebase (se puede compartir la instancia si se desea)
const firebaseApp = initializeApp(Configuration.real_time_database);
const database = getDatabase(firebaseApp);
const dbRef = ref(database);

// Crear contexto para la base de datos
const DatabaseContext = createContext();

// Hook para acceder al contexto de la base de datos
export function useDatabase() {
  return useContext(DatabaseContext);
}

// Provider para la base de datos
export function DatabaseProvider({ children }) {
  const dbFunctions = useProvideDatabase();
  return <DatabaseContext.Provider value={dbFunctions}>{children}</DatabaseContext.Provider>;
}

// Hook que expone las funciones para interactuar con la base de datos
function useProvideDatabase() {
  const getRequest = (path) => {
    return get(child(dbRef, `${path}`));
  };

  const postRequest = (path, obj) => {
    return push(child(dbRef, `${path}`), obj);
  };

  const deleteRequest = (path) => {
    return remove(child(dbRef, `${path}`));
  };

  return { getRequest, postRequest, deleteRequest };
}
