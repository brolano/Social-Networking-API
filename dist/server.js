import express from 'express';
import mongoose from 'mongoose';
require('./config/connection');
const userRoutes = './routes/api/userRoutes';
const thoughtRoutes = './routes/api/thoughtRoutes';
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);
mongoose.connection.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
});
