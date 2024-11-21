import User from '../models/user.js'; // Modelo de usuario
import bcrypt from 'bcryptjs'; // Para el hash de contraseñas

// Controlador para crear un nuevo usuario
export const createUser = async (req, res) => {
  const { email, password, name, about, avatar } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario con este correo ya existe' });
    }

    // Crear un nuevo usuario
    const newUser = new User({
      email,
      password,
      name: name || 'Jacques Cousteau', // Usar el valor predeterminado si no se proporciona
      about: about || 'Explorador', // Usar el valor predeterminado si no se proporciona
      avatar: avatar || 'https://example.com/avatar.jpg' // Usar el valor predeterminado si no se proporciona
    });

    // Guardar el nuevo usuario en la base de datos
    await newUser.save();
    
    res.status(201).json({ message: 'Usuario creado con éxito', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el usuario' });
  }
};
