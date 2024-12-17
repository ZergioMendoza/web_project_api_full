import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Usamos useNavigate para redirigir
import '../blocks/auth.css';   // Estilos comunes
import ErrorPopup from './ErrorPopup'; // Importa el componente de ErrorPopup

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Usamos navigate para redirigir al usuario

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de contraseñas
    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden.');
      setIsErrorPopupOpen(true);
      return;
    }

    try {
      await onRegister(email, password); // Llamada al backend para registrar
      navigate('/signin'); // Redirigir al login después del registro
    } catch (error) {
      setErrorMessage('Error al registrarse. Intenta nuevamente.');
      setIsErrorPopupOpen(true);
    }
  };

  const closeErrorPopup = () => setIsErrorPopupOpen(false);

  return (
    <div className="auth-container"> {/* Añadimos el contenedor específico */}
      <div className="auth register">
        <h2>Regístrate</h2>
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
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Registrar</button>
        </form>

        <p className="register-text">
          ¿Ya eres miembro? <Link to="/signin">Inicia sesión aquí</Link>
        </p>

        {/* <ErrorPopup isOpen={isErrorPopupOpen} onClose={closeErrorPopup} message={errorMessage} /> */}
      </div>
    </div>
  );
};

export default Register;
