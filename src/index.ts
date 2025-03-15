import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan'; // ✅ Logs incoming requests
import authRoutes from './routes/auth';

import taskRoutes from './routes/task';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // Logs each request


app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
    console.log(' API Root Accessed');
    res.send('API is running successfully!');
});

mongoose.connect(process.env.MONGO_URI as string)
    .then(() => {
        console.log('MongoDB connected');
        app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
    })
    .catch(err => console.error('MongoDB connection error:', err));
