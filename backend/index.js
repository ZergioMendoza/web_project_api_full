const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const handleErrors = require('./middlewares/errorHandler');  // Importamos el middleware de errores

const app = express();

// Usamos bodyParser para parsear las solicitudes JSON
app.use(bodyParser.json());

// Aquí van tus rutas, por ejemplo:
const userRouter = require('./routes/users');
app.use('/users', userRouter);

// Middleware de manejo de errores (debe ir al final)
app.use(handleErrors);

// Conexión con la base de datos
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado a la base de datos');
  })
  .catch((err) => {
    console.error('Error de conexión:', err);
  });

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
