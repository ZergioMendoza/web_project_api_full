
import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import routes from './routes/index.js';  // Importa las rutas centralizadas
import cardsRoutes from './routes/cards.js';
import usersRoutes from './routes/users.js';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';  // Asegúrate de importar bodyParser si lo necesitas

// 1. Cargar las variables de entorno
dotenv.config();

// 2. Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/aroundb_sergio")
  .then(() => {

  })
  .catch((err) => {

  });

// Logs detallados para la conexión a MongoDB
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to', process.env.MONGO_URI || "mongodb://localhost:27017/aroundb_sergio");
});

mongoose.connection.on('error', (err) => {

});

mongoose.connection.on('disconnected', () => {

});

const app = express();
const port = process.env.PORT || 3001;

// 3. Middleware para registrar las solicitudes (depuración)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`, req.body);
  next();
});

// 4. Configuración de CORS y JSON
app.use(cors({ origin: ['http://localhost:3000', 'https://instabook.mooo.com', 'https://www.instabook.mooo.com']}));
app.use(express.json());

// 5. Middleware para procesar cuerpos de solicitudes (si lo necesitas)
app.use(bodyParser.json());

// 6. Rutas de la aplicación
app.use('/api', routes);
app.use('/api/cards', cardsRoutes);
app.use('/api/users', usersRoutes);

// 7. Ruta raíz
app.get('/', (req, res) => res.send('Backend funcionando correctamente'));

// 8. Ruta de error 404
app.use((req, res) => res.status(404).json({ message: 'Ruta no encontrada' }));

// 9. Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

