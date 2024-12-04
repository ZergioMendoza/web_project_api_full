// routes/cards.js

import express from 'express';
import { getCards, createCard, deleteCard } from '../controllers/cards.js';  // Eliminamos la referencia a 'updateCardLikes'
import { authenticateToken } from '../middlewares/auth.js';  // Autenticación
import { celebrate, Joi, Segments } from 'celebrate';
import validateURL from '../utils/validateURL.js';  // Función para validar la URL

const router = express.Router();

// Ruta para crear una nueva tarjeta
router.post('/',
  authenticateToken,  // Usamos authenticateToken para la autenticación
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom(validateURL),
    })
  }),
  createCard  // Llama a la función que crea la tarjeta
);

// Ruta para obtener todas las tarjetas
router.get('/', getCards);

// Ruta para eliminar una tarjeta
router.delete('/:id', authenticateToken, deleteCard);

// Exportamos las rutas de las tarjetas
export default router;
