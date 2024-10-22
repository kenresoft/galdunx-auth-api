import { CustomRequest, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { extractErrorMessage as errorMessage, logErrorWithTimestamp as log } from '../utils/errorUtil';
import { User } from '../models/userModel';
import { TokenPayload } from '../types/express';

const authenticateToken = async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        const errMessage = 'No token provided';
        log('Token authentication', errMessage);
        return res.status(401).json({
            success: false,
            message: 'No token provided. Access denied.',
            error: null,
        });
    }

    try {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, config.jwtSecret) as TokenPayload;

        const user = await User.findById(decoded.id).select('-password'); // Exclude password from user object
        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found. Access denied.' });
        }

        req.user = user;
        next();

    } catch (error) {
        const errMessage = errorMessage(error);
        log('Authentication Error:', errMessage);
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token. Access denied.',
            error: errMessage,
        });
    }
};

export default authenticateToken;
