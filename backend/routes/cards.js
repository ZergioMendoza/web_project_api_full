import express from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import validateURL from '../utils/validateURL';  // Importar la función de validación personalizada
import { createCard } from '../controllers/cards.js';  // El controlador que maneja la creación de tarjetas

const router = express.Router();

// Ruta para crear una tarjeta con validación de datos
router.post('/cards', 
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),  // Validación para el nombre
      link: Joi.string().required().custom(validateURL),  // Validación de la URL usando la función personalizada
    })
  }),
  createCard  // Si los datos son válidos, ejecuta el controlador
);

export default router;
