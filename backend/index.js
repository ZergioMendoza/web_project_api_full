// index.js (Raíz del Backend)

import express from 'express';
import path from 'path';
import logger from './utils/logger.js'; // Asegúrate de que el archivo existe
import routes from './routes/index.js'; // Rutas generales, incluyendo login y autenticación
import cardsRoutes from './routes/cards.js'; // Rutas de tarjetas
import usersRoutes from './routes/users.js'; // Rutas de usuarios
import cors from 'cors'; // Importamos cors para habilitar la comunicación entre diferentes dominios
import dotenv from 'dotenv'; // Asegúrate de que dotenv esté importado

dotenv.config(); // Cargar las variables de entorno

const app = express();

// Cambié el puerto a 3001 para que no haya conflicto con el puerto 5000
const port = process.env.PORT || 3001; // Cambié el puerto a 3001, si no está definido en .env

// Solución para obtener el directorio actual en ES Modules
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Habilitar CORS para el frontend (en este caso solo permitimos localhost:3000)
const corsOptions = {
  origin: 'http://localhost:3000', // URL de tu frontend
  methods: 'GET, POST, PATCH, DELETE', // Métodos permitidos
  allowedHeaders: 'Content-Type, Authorization', // Cabeceras permitidas
};

app.use(cors(corsOptions)); // Configuración de CORS con las opciones

// Middleware para procesar datos en formato JSON
app.use(express.json());

// Configuración de las rutas de la API
app.use('/api', routes); // Rutas generales (login, etc.)
app.use('/api/cards', cardsRoutes); // Rutas de tarjetas
app.use('/api/users', usersRoutes); // Rutas de usuarios

// Ruta para manejar el acceso directo a la raíz (opcional)
app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// Ruta para manejar 404 (cuando no existe la ruta)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Captura errores y muestra un mensaje en caso de fallo
try {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
} catch (error) {
  logger.error('Error during server startup:', error);
  process.exit(1); // Si el servidor no puede arrancar, finaliza el proceso
}
