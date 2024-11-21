import express from 'express';
import { getCurrentUser } from '../controllers/users.js';
import { auth } from '../middlewares/auth.js';  // Middleware de autenticación
import handleErrors from '../middlewares/errorHandler.js'; // Importamos el middleware de manejo de errores

const router = express.Router();

// Ruta para obtener información del usuario actual
router.get('/me', auth, (req, res, next) => {
  try {
    getCurrentUser(req, res);  // Llamamos al controlador que devuelve la información del usuario
  } catch (error) {
    next(error);  // Si ocurre un error, lo pasamos al middleware de manejo de errores
  }
});

// Middleware de manejo de errores (este ya está en tu archivo `app.js` como te lo expliqué anteriormente)
router.use(handleErrors); // Este middleware se coloca al final, después de todas las rutas

export default router;
