import express from 'express';
import AuthController from '../controllers/authController';
import authenticateToken from '../middlewares/authMiddleware';

export default (router: express.Router): void => {
    router.post('/auth/register', AuthController.register);
    router.post('/auth/login', AuthController.login);
    router.post('/auth/refresh', AuthController.refreshToken);
    router.get('/auth/home', authenticateToken, AuthController.home);
};