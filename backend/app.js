// // backend/app.js
// import express from 'express';
// import bodyParser from 'body-parser';
// import dotenv from 'dotenv';
// import cors from 'cors';  // Importa CORS
// import requestLogger from './middlewares/requestLogger.js'; // Middleware para registrar solicitudes
// import handleErrors from './middlewares/errorHandler.js'; // Middleware para manejar errores
// import routes from './routes/index.js'; // Centralizar rutas en un archivo

// dotenv.config();

// const app = express();

// // Configuración de CORS
// // app.use(cors({
// //   origin: ['http://tu-dominio-front-end.com', 'http://localhost:3000'],  // Agregar dominios permitidos
// //   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],  // Métodos permitidos
// //   allowedHeaders: ['Content-Type', 'Authorization'],  // Cabeceras permitidas
// //   credentials: true,  // Permitir el envío de cookies y credenciales
// // }));

// // Middleware para registrar todas las solicitudes
// app.use(requestLogger);

// // Middleware para procesar cuerpos de solicitudes
// app.use(bodyParser.json());

// // Rutas de la aplicación
// app.use('/api', routes);

// // Middleware para manejar los errores
// app.use(handleErrors);

// // Respuesta para rutas no existentes
// app.all('*', (req, res) => {
//   res.status(404).send({ message: 'Recurso no encontrado' });
// });

// // Iniciar el servidor
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Servidor escuchando en http://localhost:${PORT} en modo ${process.env.NODE_ENV || 'desarrollo'}`);
// });

// export default app;
