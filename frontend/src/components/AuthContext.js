import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);  // 'auth' es el estado que define si el usuario está autenticado

  useEffect(() => {
    const token = localStorage.getItem('token');  // Aquí verificamos el token almacenado
    if (token) {
      setAuth(true);  // Si hay token, consideramos que el usuario está autenticado
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');  // Eliminar el token al hacer logout
    setAuth(false);  // Cambiar el estado de autenticación a falso
  };

  return (
    <AuthContext.Provider value={{ auth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
