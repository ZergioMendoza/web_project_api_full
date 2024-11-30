// middlewares/auth.js

import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ error: 'Acceso denegado. Token no proporcionado.' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET); // Usamos la variable de entorno
    req.user = payload; // Agrega el payload al objeto de solicitud
    next(); // Continúa con la solicitud
  } catch (error) {
    console.error('Error al verificar el token:', error);
    res.status(403).json({ error: 'Token no válido o expirado.' });
  }
};

