import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo.svg';
import api from '../utils/Api'; // Asegúrate de que Api esté exportado correctamente

export default function Header({ onLogout, isAuthenticated }) {
  const [userEmail, setUserEmail] = useState(null); // Para almacenar el correo del usuario
  const location = useLocation();

  // Cambiar el color del header dependiendo de la ruta
  const headerClass = location.pathname === '/signin' || location.pathname === '/signup'
    ? 'header-login'
    : 'header-authenticated';

  // Usamos useEffect para cargar la información del usuario cuando el componente se monta
  useEffect(() => {
    if (isAuthenticated) {
      // Llamamos a la API para obtener la información del usuario
      api.getUserInfo()
        .then((userData) => {
          setUserEmail(userData.email); // Suponiendo que la API devuelve un campo "email"
        })
        .catch((error) => {

          // Maneja el error, por ejemplo, eliminando el token si hay un error
          localStorage.removeItem('token');
          onLogout(); // Llamar a onLogout si es necesario
        });
    }
  }, [isAuthenticated, onLogout]); // Dependencias: ejecutarlo solo cuando el usuario esté autenticado

  return (
    <header className={`header ${headerClass}`}>
      <img src={logo} alt="Logo" className="header__logo" />
      <nav className="header__nav">
        {isAuthenticated ? (
          <>
            <span className="header__user">{userEmail || 'Cargando...'}</span> {/* Mostrar el correo del usuario */}
            <button className="header__logout" onClick={onLogout}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <div className="header__auth-links">
            <Link to="/signin" className="header__link">
              Iniciar sesión
            </Link>
            <Link to="/signup" className="header__link">
              Registrarse
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
