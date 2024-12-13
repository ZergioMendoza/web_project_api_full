import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Usamos useNavigate para redirigir
import '../blocks/login.css';  // Estilos específicos de login
import '../blocks/auth.css';   // Estilos comunes
import ErrorPopup from './ErrorPopup'; // Importa el nuevo ErrorPopup

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
  const navigate = useNavigate(); // Usamos navigate para redirigir al usuario
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onLogin(email, password); // Llamada al backend
      //navigate('/'); // Redirigir al inicio
    } catch (error) {
      setErrorMessage('Error en las credenciales. Intenta nuevamente.');
      setIsErrorPopupOpen(true);
    }
  };

  const closeErrorPopup = () => setIsErrorPopupOpen(false);

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

      <p className="register-text">
        ¿Aún no eres miembro? <Link to="/signup">Regístrate aquí</Link>
      </p>

      <ErrorPopup isOpen={isErrorPopupOpen} onClose={closeErrorPopup} message={errorMessage} />
    </div>
  );
};

export default Login;
