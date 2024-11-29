// backend/middlewares/errorHandler.js

import logger from '../utils/logger.js'; // Importamos el logger de winston

const handleErrors = (err, req, res, next) => {
  // Si el error es una validación fallida, lo registramos y respondemos con un mensaje adecuado
  if (err.name === 'ValidationError') {
    logger.error({
      message: err.message,
      stack: err.stack,
      statusCode: 400,
      method: req.method,
      url: req.originalUrl,
    });
    return res.status(400).send({ message: err.message });
  }

  // Si el error es un CastError (por ejemplo, un ID con formato incorrecto)
  if (err.name === 'CastError') {
    logger.error({
      message: 'Invalid ID format',
      stack: err.stack,
      statusCode: 400,
      method: req.method,
      url: req.originalUrl,
    });
    return res.status(400).send({ message: 'Invalid ID format' });
  }

  // Si el error es un NotFound (no se encuentra el recurso)
  if (err.name === 'NotFound') {
    logger.error({
      message: err.message,
      stack: err.stack,
      statusCode: 404,
      method: req.method,
      url: req.originalUrl,
    });
    return res.status(404).send({ message: err.message });
  }

  // Si es un error inesperado, devolvemos un error 500
  logger.error({
    message: 'Internal Server Error',
    stack: err.stack,
    statusCode: 500,
    method: req.method,
    url: req.originalUrl,
  });
  return res.status(500).send({ message: 'Internal Server Error' });
};

export default handleErrors;
