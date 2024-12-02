// controllers/authController.js
import bcrypt from 'bcryptjs';  // Para comparar contraseñas encriptadas
import jwt from 'jsonwebtoken';  // Para crear el token JWT
import User from '../models/User.js';  // Asegúrate de tener un modelo de usuario

// Lógica para login
export const login = async (req, res) => {
  const { email, password } = req.body;

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
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }  // El token expirará en 1 hora
    );

    // 4. Enviar el token como respuesta
    res.json({ token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
