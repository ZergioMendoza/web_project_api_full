import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo.svg';

export default function Header({ onLogout, isAuthenticated }) {
  const location = useLocation();

  // Cambiar el color del header dependiendo de la ruta
  const headerClass = location.pathname === '/signin' || location.pathname === '/signup'
    ? 'header-login'
    : 'header-authenticated';

  return (
    <header className={`header ${headerClass}`}>
      <img src={logo} alt="Logo" className="header__logo" />
      <nav className="header__nav">
        {isAuthenticated ? (
          <>
            <span className="header__user">Usuario</span>
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
