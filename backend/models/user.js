import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from "bcryptjs";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    default: 'Jacques Cousteau',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Explorador',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Debe ser una URL válida',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Debe ser un correo electrónico válido',
    },
  },
  password: {
    type: String,
    required: true,
    select: false, // Este campo no será devuelto por defecto
  },
});

userSchema.statics.findUserByCredentials = async function (email, password) {
  const user = await this.findOne({ email }).select("+password");
  if (!user) {
    return Promise.reject(new Error("Incorrect credentials"));
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return Promise.reject(new Error("Incorrect credentials"));
  }

  return user;
};

export default mongoose.model('User', userSchema);
