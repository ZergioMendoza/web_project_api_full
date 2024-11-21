// utils/validateURL.js
import validator from 'validator';

// Función personalizada para validar URLs
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;  // Si es válida, retorna el valor
  }
  return helpers.error('string.uri');  // Si no es válida, lanza un error
};

export default validateURL;
