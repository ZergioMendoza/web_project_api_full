
import express from 'express';
import cardRoutes from './cards.js';  // Asegúrate de que esta ruta sea correcta

const router = express.Router();

// Ejemplo de ruta de prueba
router.get('/', (req, res) => {
  res.send('API Root Endpoint');
});

// Asegúrate de exportar las rutas
router.use('/cards', cardRoutes);  // Asegúrate de tener esta línea si tienes rutas de cards

export default router;
