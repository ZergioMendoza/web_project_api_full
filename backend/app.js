// backend/app.js
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import requestLogger from './middlewares/requestLogger.js'; // Middleware para registrar solicitudes
import handleErrors from './middlewares/errorHandler.js'; // Middleware para manejar errores
import usersRouter from './routes/users.js'; // Rutas de usuarios
import cardsRouter from './routes/cards.js'; // Rutas de tarjetas
import cors from 'cors';  // Importa CORS

dotenv.config();



const app = express();

app.use(cors({
  origin: 'http://tu-dominio-front-end.com',  // Sustituye esto con el dominio de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'],  // Cabeceras permitidas
}));


// Middleware para registrar todas las solicitudes
app.use(requestLogger);

// Middleware para procesar cuerpos de solicitudes
app.use(bodyParser.json());

// Rutas de la aplicación
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

// Middleware para manejar los errores
app.use(handleErrors);

app.all('*', (req, res) => {
  res.status(404).send({message: 'NOT FOUND'})
})

app.listen(3000, () => {
  console.log('listen')
})

export default app;
