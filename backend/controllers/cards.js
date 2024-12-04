// controllers/cards.js

// Aquí guardamos las tarjetas en memoria (esto es solo para ejemplo)
let cards = [];

// Función para crear una tarjeta
export const createCard = (req, res) => {
  const { name, link } = req.body;

  // Validamos que los datos existan
  if (!name || !link) {
    return res.status(400).json({ message: 'Name and link are required' });
  }

  // Añadimos la tarjeta al arreglo (esto reemplaza la base de datos por ahora)
  const newCard = { name, link };
  cards.push(newCard);

  // Respondemos con el objeto creado
  res.status(201).json({
    message: 'Card created successfully',
    card: newCard
  });
};

// Función para obtener todas las tarjetas
export const getCards = (req, res) => {
  res.status(200).json(cards);  // Devolvemos las tarjetas en memoria
};

// Función para eliminar una tarjeta
export const deleteCard = (req, res) => {
  const { id } = req.params;  // Obtenemos el id de la tarjeta a eliminar

  // Buscamos la tarjeta por el id
  const cardIndex = cards.findIndex(card => card.id === id);

  if (cardIndex === -1) {
    return res.status(404).json({ message: 'Card not found' });
  }

  // Eliminamos la tarjeta
  cards.splice(cardIndex, 1);

  res.status(200).json({ message: 'Card deleted successfully' });
};
