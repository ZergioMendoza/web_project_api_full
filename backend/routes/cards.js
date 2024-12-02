import express from 'express';
import { createCard } from '../controllers/cards.js';
import { auth } from '../middlewares/auth.js';  // Middleware para la autenticación
import { celebrate, Joi, Segments } from 'celebrate';
import validateURL from '../utils/validateURL.js';  // Función para validar la URL

const router = express.Router();

// Ruta para crear una nueva tarjeta
router.post('/',
  auth,  // Verifica la autenticación del usuario
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom(validateURL),
    })
  }),
  createCard  // Llama a la función que crea la tarjeta
);

export default router;
