import express from 'express';
import { getCurrentUser, updateAvatar, updateUserInfo } from '../controllers/users.js'; // Asegúrate de que esto esté correcto
import { authenticateToken } from '../middlewares/auth.js';

const router = express.Router();

// Ruta para obtener la información del usuario
router.get('/me', authenticateToken, getCurrentUser);

// Ruta para actualizar el avatar del usuario
router.patch('/me/avatar', authenticateToken, updateAvatar);

// Ruta para actualizar el nombre y el "acerca de mí" del usuario
router.patch('/me', authenticateToken, updateUserInfo);

export default router;
