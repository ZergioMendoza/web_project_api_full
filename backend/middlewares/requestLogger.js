// backend/middlewares/requestLogger.js
import logger from '../utils/logger.js';  // Usamos el logger que ya creamos

// Middleware para registrar todas las solicitudes HTTP
const requestLogger = (req, res, next) => {
  // Loggear información básica sobre la solicitud
  logger.info({
    message: `Received ${req.method} request for ${req.originalUrl}`,
    method: req.method,
    url: req.originalUrl,
    timestamp: new Date().toISOString()
  });

  // Continuar con la ejecución de la solicitud
  next();
};

export default requestLogger;
