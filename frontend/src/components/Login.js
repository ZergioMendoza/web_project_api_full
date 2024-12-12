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
      // Llamamos a la función onLogin, la cual hace la solicitud al backend
      await onLogin(email, password);
      //navigate('/'); // Redirigimos a la página principal después de iniciar sesión
    } catch (error) {
      setErrorMessage('Error en las credenciales. Intenta nuevamente.'); // Muestra mensaje de error
      setIsErrorPopupOpen(true); // Mostrar el popup de error
    }
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
      <ErrorPopup isOpen={isErrorPopupOpen} onClose={closeErrorPopup} message={errorMessage} />
    </div>
  );
};

export default Login;
