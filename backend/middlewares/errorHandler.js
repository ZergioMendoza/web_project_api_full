// Middleware para el manejo de errores
const handleErrors = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).send({ message: err.message });
  }
  if (err.name === 'CastError') {
    return res.status(400).send({ message: 'Invalid ID format' });
  }
  if (err.name === 'NotFound') {
    return res.status(404).send({ message: err.message });
  }
  // Si es un error imprevisto, devolvemos un error 500
  return res.status(500).send({ message: 'Internal Server Error' });
};

export default handleErrors;
