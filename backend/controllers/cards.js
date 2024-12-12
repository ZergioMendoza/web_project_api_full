import Card from "../models/card.js";

// Obtener todas las tarjetas
export const getAllCards = async (req, res) => {
  try {
    const cards = await Card.find().populate('owner likes');
    return res.send(cards); // Retornar las tarjetas obtenidas
  } catch (err) {
    return res.status(500).send({ message: 'Error al obtener tarjetas', error: err }); // Retornar error si hay un problema
  }
};

// Crear una nueva tarjeta
export const createCard = async (req, res) => {
  const { name, link } = req.body;

  console.log('owner', req.user);

  try {
    const card = new Card({ name, link, owner: req.user._id });
    await card.save();
    return res.status(201).send(card); // Retornar la tarjeta creada
  } catch (err) {
    return res.status(400).send({ message: 'Error al crear la tarjeta', error: err }); // Retornar error si hay un problema
  }
};

// Eliminar una tarjeta por ID
export const deleteCard = async (req, res) => {
  const { cardId } = req.params;

  try {
    const deletedCard = await Card.findByIdAndDelete(cardId);
    if (!deletedCard) {
      return res.status(404).send({ message: 'Tarjeta no encontrada' }); // Retornar mensaje si no se encuentra la tarjeta
    }
    return res.send({ message: 'Tarjeta eliminada exitosamente' }); // Retornar mensaje de éxito
  } catch (err) {
    return res.status(500).send({ message: 'Error al eliminar tarjeta', error: err }); // Retornar error si hay un problema
  }
};
