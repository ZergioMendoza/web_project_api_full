// controllers/users.js

import User from '../models/user.js';  // Asegúrate de que este modelo esté correctamente importado

export const getCurrentUser = (req, res, next) => {
  const userId = req.user.id;  // Accedemos al ID del usuario desde el token

  User.findById(userId)
    .then(user => {
      if (!user) {
        const error = new Error('Usuario no encontrado');
        error.name = 'NotFound';
        return next(error);  // Pasamos el error al middleware
      }
      res.status(200).json(user);  // Si encontramos el usuario, lo enviamos como respuesta
    })
    .catch(next);  // Si hay un error, pasamos al middleware de errores
};
