import express from 'express';
import path from 'path';
import logger from './utils/logger.js'; // Asegúrate de que la ruta sea correcta
import routes from './routes/index.js';
import cors from 'cors';  // Importamos cors para habilitar la comunicación entre diferentes dominios
import dotenv from 'dotenv';  // Asegúrate de que dotenv esté importado

dotenv.config();  // Cargar las variables de entorno

const app = express();
const port = process.env.PORT || 5000;  // Cambié el puerto a 5000 para que coincida con el .env

// Solución para obtener el directorio actual en ES Modules
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Habilitar CORS para el frontend (en este caso solo permitimos localhost:3000)
const corsOptions = {
  origin: 'http://localhost:3000',  // URL de tu frontend
  methods: 'GET, POST, PATCH, DELETE',  // Métodos permitidos
  allowedHeaders: 'Content-Type, Authorization',  // Cabeceras permitidas
};

app.use(cors(corsOptions));  // Configuración de CORS con las opciones

// Middleware para procesar datos en formato JSON
app.use(express.json());

// Configuración de las rutas de la API
app.use('/api', routes);  // Asegúrate de que en tus rutas esté el prefijo /api o ajusta según sea necesario

// Ruta para manejar el acceso directo a la raíz (opcional)
app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// Ruta para manejar 404 (cuando no existe la ruta)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Servir archivos estáticos desde la carpeta de construcción del frontend (si ya está construida)
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Captura errores y muestra un mensaje en caso de fallo
try {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
} catch (error) {
  logger.error('Error during server startup:', error);
  process.exit(1); // Si el servidor no puede arrancar, finaliza el proceso
}
