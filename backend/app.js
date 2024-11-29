// backend/app.js

import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import requestLogger from './middlewares/requestLogger'; // Middleware para registrar solicitudes
import handleErrors from './middlewares/errorHandler'; // Middleware para manejar errores

const app = express();

// Middleware para registrar todas las solicitudes
app.use(requestLogger);

// Middleware para procesar cuerpos de solicitudes
app.use(bodyParser.json());

// Otras rutas y middlewares de la aplicación
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

// Middleware para manejar los errores
app.use(handleErrors);

export default app;
