import express from 'express';
import { getCurrentUser } from '../controllers/users.js';
import { auth } from '../middlewares/auth.js';  // Middleware para la autenticación

const router = express.Router();

// Ruta para obtener los datos del usuario autenticado
router.get('/me', auth, getCurrentUser);

export default router;
