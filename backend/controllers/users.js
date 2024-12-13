import User from '../models/user.js';

export const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .then(user => {
      if (!user) {
        const error = new Error('Usuario no encontrado');
        error.name = 'NotFound';
        return next(error);
      }
      res.status(200).json(user); // Si encontramos el usuario, lo enviamos como respuesta
    })
    .catch(next); // Si hay un error, lo pasamos al middleware de errores
};

// Esta es la nueva función que va a permitir actualizar la información del usuario (nombre y acerca de)
export const updateUserInfo = (req, res, next) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  // Validar que los campos no estén vacíos
  if (!name || !about) {
    return res.status(400).json({ message: 'Name and about are required' });
  }

  User.findByIdAndUpdate(userId, { name, about }, { new: true })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user); // Respondemos con el usuario actualizado
    })
    .catch(next); // En caso de error, lo pasamos al middleware de errores
};

// Esta es la función para actualizar el avatar
export const updateAvatar = (req, res, next) => {
  const userId = req.user._id;
  const { avatar } = req.body;

  if (!avatar) {
    return res.status(400).json({ message: 'Avatar is required' });
  }

  User.findByIdAndUpdate(userId, { avatar }, { new: true })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user); // Respondemos con el usuario actualizado
    })
    .catch(next);
};
