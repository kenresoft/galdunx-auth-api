import dotenv from 'dotenv';

dotenv.config();

export default {
    port: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET || 'ACCESS_TOKEN_SECRET',
    jwtExpiration: '15m',
    refreshTokenSecret: process.env.JWT_REFRESH_SECRET || 'REFRESH_TOKEN_SECRET',
    refreshTokenExpiration: '7d',
    refreshTokenExpirationMs: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || '10'),
    mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/authAPI',
};
