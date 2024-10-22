import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET || 'secret-key',
    jwtExpiration: process.env.JWT_EXPIRATION || '1h',
    bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || '10'),
    mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/authAPI',
};
