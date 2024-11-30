import User from '../models/user.js';

export const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;  // Supongo que `req.user` es el usuario autenticado

  User.findById(userId)
    .then(user => {
      if (!user) {
        // Si no se encuentra el usuario, generamos un error de tipo 'NotFound'
        const error = new Error('Usuario no encontrado');
        error.name = 'NotFound';
        return next(error);  // Pasamos el error al middleware
      }
      res.status(200).send(user);  // Si encontramos el usuario, lo enviamos como respuesta
    })
    .catch(err => {
      // Si ocurre algún otro error (por ejemplo, un error de base de datos), lo pasamos al middleware
      next(err);
    });
};
