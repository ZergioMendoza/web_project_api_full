// routes/users.js

import express from 'express';
import { getCurrentUser } from '../controllers/users.js';  // Asegúrate de que la función esté definida correctamente
import { authenticateToken } from '../middlewares/auth.js';  // Usamos authenticateToken para la autenticación

const router = express.Router();

// Ruta para obtener los datos del usuario autenticado
router.get('/me', authenticateToken, getCurrentUser);

export default router;
