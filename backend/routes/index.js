// routes/index.js

import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js'; // Asegúrate de que este modelo exista y esté bien configurado
import { authenticateToken } from '../middlewares/auth.js'; // Importar la función correctamente
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Ruta POST para el login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Buscar el usuario por email
    const user = await User.findOne({ email });

    // Si no se encuentra el usuario, devolvemos un error
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 2. Comparar la contraseña proporcionada con la almacenada en la base de datos
    const isMatch = await bcrypt.compare(password, user.password);

    // Si las contraseñas no coinciden, devolvemos un error
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 3. Si las credenciales son correctas, generamos un token JWT
    const token = jwt.sign(
      { id: user._id },  // Guardamos el ID del usuario en el token
      process.env.JWT_SECRET,  // El secreto que guardas en tu archivo .env
      { expiresIn: '1h' }  // El token expirará en 1 hora
    );

    // 4. Devolvemos el token al frontend
    res.json({ token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Ruta protegida: Obtener la información del usuario
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Accedemos al ID del usuario desde el token
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Exportamos las rutas para ser usadas en el archivo principal del servidor
export default router;
