// backend/utils/logger.js
import winston from 'winston';
import path from 'path';

// Obtener el directorio actual utilizando import.meta.url
const logDirectory = path.join(path.dirname(new URL(import.meta.url).pathname), '../logs');

// Crear el logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    // Registrar todas las solicitudes HTTP en request.log
    new winston.transports.File({
      filename: path.join(logDirectory, 'request.log'),
      level: 'info',
    }),
    // Registrar los errores en error.log
    new winston.transports.File({
      filename: path.join(logDirectory, 'error.log'),
      level: 'error',
    }),
  ],
});

export default logger;
