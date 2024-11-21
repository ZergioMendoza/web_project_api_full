import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importar Link
import '../blocks/login.css';  // Estilos específicos de login
import '../blocks/auth.css';   // Estilos comunes
import ErrorPopup from './ErrorPopup'; // Importa el nuevo ErrorPopup

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password).catch(() => {
      setIsErrorPopupOpen(true); // Mostrar el popup de error
    });
  };

  const closeErrorPopup = () => {
    setIsErrorPopupOpen(false); // Cerrar el popup de error
  };

  return (
    <div className="auth login">
      <h2>¿Quieres Ingresar?</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Iniciar sesión</button>
      </form>

      {/* Texto adicional */}
      <p>
        ¿Aún no eres miembro? <Link to="/signup">Regístrate aquí</Link>
      </p>

      {/* Popup de error */}
      <ErrorPopup isOpen={isErrorPopupOpen} onClose={closeErrorPopup} />
    </div>
  );
};

export default Login;

