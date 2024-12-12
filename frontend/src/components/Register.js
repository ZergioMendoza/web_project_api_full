import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importar Link

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('registrando');
    onRegister(email, password); // Llamada a la función onRegister
  };

  return (
    <div className="register">
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
        <button type="submit">Registrar</button>
      </form>

      <p>
        ¿Ya eres miembro? <Link to="/signin">Inicia sesión aquí</Link>
      </p>
    </div>
  );
};

export default Register;
