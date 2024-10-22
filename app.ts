import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './src/routes/authRoutes';
import { config } from './src/config/config';

const app = express();

app.use(express.json());

// Using API versioning for all routes
app.use('/api/v1/auth', authRoutes);

mongoose.connect(config.mongoURI, {})
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('MongoDB connection error:', error));

export default app;
