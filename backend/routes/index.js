// routes/index.js

import express from 'express';
import { authenticateToken } from '../middlewares/auth.js'; // Importar la función correctamente
import dotenv from 'dotenv';
import { login, register } from '../controllers/userController.js';
import { getCurrentUser } from '../controllers/users.js';

dotenv.config();

const router = express.Router();

// Ruta POST para el login
router.post('/signin', login);

router.post('/signup', register);

// Ruta protegida: Obtener la información del usuario
router.get('/me', authenticateToken, getCurrentUser);

// Exportamos las rutas para ser usadas en el archivo principal del servidor
export default router;
