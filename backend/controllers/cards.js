// controllers/cards.js

// Función para crear una tarjeta
export const createCard = (req, res) => {
    const { name, link } = req.body;
  
    // Aquí realizarías la lógica para guardar la tarjeta en la base de datos
    // Ejemplo de respuesta
    res.status(201).send({
      message: 'Card created successfully',
      card: { name, link }
    });
  };
  