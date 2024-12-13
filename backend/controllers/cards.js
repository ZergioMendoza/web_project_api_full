// controllers/cards.js
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



// Controlador para agregar un "like"
export const likeCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const userId = req.user._id; // Asegúrate de que req.user esté disponible a través de un middleware de autenticación

    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } }, // Agrega el usuario al array de likes si no está presente
      { new: true } // Devuelve el documento actualizado
    );

    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    res.status(200).json(card);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error liking card' });
  }
};

// Controlador para eliminar un "like"
export const unlikeCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const userId = req.user._id;

    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } }, // Elimina el usuario del array de likes
      { new: true }
    );

    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    res.status(200).json(card);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error unliking card' });
  }
};
