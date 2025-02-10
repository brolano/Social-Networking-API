import express, { Application } from 'express';
import db from './config/connection.js';
import userRoutes from './routes/api/userRoutes.js';
import thoughtRoutes from './routes/api/thoughtRoutes.js';

const app: Application = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3001;

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server for Social Networking API running on port ${PORT}!`);
  });
});
