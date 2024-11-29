import express from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
// Importar la función de validación personalizada
import { createCard } from '../controllers/cards.js';  // El controlador que maneja la creación de tarjetas

import validateURL from '../utils/validateURL.js';  // Asegúrate de que la ruta sea correcta
import { auth } from '../middlewares/auth';  // Importa el middleware de autenticación

const router = express.Router();

// Ruta para crear una tarjeta con validación de datos y autenticación
router.post('/cards',
  auth,  // Agregar el middleware auth para proteger la ruta
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),  // Validación para el nombre
      link: Joi.string().required().custom(validateURL),  // Validación de la URL usando la función personalizada
    })
  }),
  createCard  // Si los datos son válidos, ejecuta el controlador
);

export default router;
