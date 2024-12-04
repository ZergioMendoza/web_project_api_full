import bcrypt from 'bcryptjs';  // Para comparar contraseñas encriptadas
import jwt from 'jsonwebtoken';  // Para crear el token JWT
import User from '../models/user.js';  // Asegúrate de tener un modelo de usuario

// Lógica para login
export const login = async (req, res) => {
  const { email, password } = req.body;

  // Validar si el email y la contraseña están presentes
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // 1. Buscar el usuario por email
    const user = await User.findOne({ email });

    // Si no se encuentra el usuario, devolvemos un error
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 2. Comparar la contraseña proporcionada con la almacenada en la base de datos
    const isMatch = await bcrypt.compare(password, user.password);

    // Si las contraseñas no coinciden, devolvemos un error
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 3. Crear un token JWT con el ID del usuario
    const token = jwt.sign(
      { id: user._id },  // Incluimos solo el ID del usuario en el token
      process.env.JWT_SECRET,  // Usamos el JWT_SECRET de las variables de entorno
      { expiresIn: '1h' }  // El token expirará en 1 hora
    );

    // 4. Enviar el token como respuesta
    res.json({ token });

  } catch (error) {
    // En lugar de solo hacer console.error(), se recomienda un sistema de log
    console.log('Login error: ', error);
    res.status(500).json({ message: 'Server error, please try again later' });
  }
};
