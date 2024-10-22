import { CustomRequest, Request, Response } from 'express';
import { registerUser, loginUser, refreshAccessToken } from '../services/authService';
import { extractErrorMessage as errorMessage, logErrorWithTimestamp as log } from '../utils/errorUtil';
import { IUser } from '../models/userModel';

const AuthController = {
    register: async (req: Request, res: Response): Promise<Response> => {
        const { username, email, password } = req.body as IUser;

        try {
            const { accessToken, refreshToken } = await registerUser(username, email, password);
            console.log(`Registration successful for email: ${email}`);
            return res.status(201).json({
                success: true,
                message: 'User registered successfully',
                accessToken,
                refreshToken,
            });
        } catch (error) {
            const errMessage = errorMessage(error);
            log('User registration', errMessage);
            return res.status(400).json({
                success: false,
                message: 'Registration failed',
                error: errMessage,
            });
        }
    },

    login: async (req: Request, res: Response): Promise<Response> => {
        const { email, password } = req.body;

        try {
            const { accessToken, refreshToken } = await loginUser(email, password);
            console.log(`Login successful for email: ${email}`);
            return res.status(200).json({
                success: true,
                message: 'Login successful',
                accessToken,
                refreshToken,
            });
        } catch (error) {
            const errMessage = errorMessage(error);
            log('User login', errMessage);
            return res.status(400).json({
                success: false,
                message: 'Login failed',
                error: errMessage,
            });
        }
    },

    refreshToken: async (req: Request, res: Response): Promise<Response> => {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({
                success: false,
                message: 'Refresh token is required',
            });
        }

        try {
            const newAccessToken = await refreshAccessToken(refreshToken);
            return res.status(200).json({
                success: true,
                accessToken: newAccessToken,
            });
        } catch (error) {
            const errMessage = errorMessage(error);
            log('Token refresh', errMessage);
            return res.status(403).json({
                success: false,
                message: 'Failed to refresh token',
                error: errMessage,
            });
        }
    },

    home: (req: CustomRequest, res: Response): Response => {
        const user = req.user as IUser;

        if (!user || typeof user !== 'object' || !user.email) {
            return res.status(400).json({
                success: false,
                message: 'Invalid token payload',
                error: 'User information is missing or invalid',
            });
        }

        return res.status(200).json({
            success: true,
            message: `Welcome, ${user.username}! You made it to the Galdunx Home Page!`,
            user: {
                id: user._id,
                email: user.email,
            },
        });
    }
};

export default AuthController;
