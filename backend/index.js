import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import cardsRoutes from './routes/cards.js';
import usersRoutes from './routes/users.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// Rutas
app.use('/api', routes);
app.use('/api/cards', cardsRoutes);
app.use('/api/users', usersRoutes);

app.get('/', (req, res) => res.send('Backend funcionando correctamente'));
app.use((req, res) => res.status(404).json({ message: 'Ruta no encontrada' }));

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
