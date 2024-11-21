// app.js o server.js
import express from 'express';
import { errors } from 'celebrate';  // Middleware de Celebrate para manejar errores de validación
import errorHandler from './middlewares/errorHandler';  // El middleware que maneja los errores personalizados

const app = express();

// Configura el servidor para manejar JSON
app.use(express.json());

// Rutas de tu API
import cardRoutes from './routes/cards.js';  // Importa tus rutas (por ejemplo, rutas de tarjetas)
app.use('/api', cardRoutes);  // Usa estas rutas en la base URL '/api'

// Middleware para errores de Celebrate
app.use(errors());  // Maneja los errores de validación generados por Celebrate

// Middleware para manejar otros errores (por ejemplo, errores internos)
app.use(errorHandler);  // Este middleware se encarga de otros tipos de errores

// Arrancar el servidor
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
