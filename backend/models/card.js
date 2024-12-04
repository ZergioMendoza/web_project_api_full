import mongoose from 'mongoose';

// Definición del esquema para la tarjeta
const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v);  // Valida si la URL es válida
      },
      message: props => `${props.value} no es una URL válida!`
    }
  }
});

// Crear el modelo de la tarjeta
const Card = mongoose.model('Card', cardSchema);

export default Card;
