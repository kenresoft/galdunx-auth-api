import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/router';
import config  from './config/config';

const app = express();

app.use(express.json());

// Using API versioning for all routes
app.use('/api/v1/', routes());

app.get('/', (req, res) => {
    res.send('API is running');
});

mongoose.connect(config.mongoURI, {})
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('MongoDB connection error:', error));

export default app; 
