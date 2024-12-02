// middleware/auth.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];  // Obtener el token del header

  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  try {
    // Verificamos el token usando el JWT secret que está en tu archivo .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Añadimos la información del usuario al objeto de la solicitud
    next();  // Continuamos con la ejecución del siguiente middleware o ruta
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
};
