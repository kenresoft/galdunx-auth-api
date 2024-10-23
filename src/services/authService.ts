import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { User, getUserByEmail, addUser } from '../models/userModel';
import { isValidEmail, isValidPassword, isValidUsername } from '../utils/validationUtil';
import { TokenPayload, TokenResponse } from '../types/express';
import { RefreshToken } from '../models/RefreshToken';

const generateAccessToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiration });
};

const generateRefreshToken = async (payload: TokenPayload): Promise<string> => {
    const refreshToken = jwt.sign(payload, config.refreshTokenSecret, { expiresIn: config.refreshTokenExpiration });

    // Save refreshToken in the database, and link it to the user.
    await RefreshToken.create({
        userId: payload.id,
        token: refreshToken,
        expiresAt: new Date(Date.now() + config.refreshTokenExpirationMs),
    });

    return refreshToken;
};

// Use the TokenResponse interface as the return type
export const registerUser = async (username: string, email: string, password: string): Promise<TokenResponse> => {
    console.log(`Registering user with email: ${email}`);

    if (!isValidUsername(username)) {
        throw new Error('Invalid username format');
    }

    if (!isValidEmail(email)) {
        throw new Error('Invalid email format');
    }

    if (!isValidPassword(password)) {
        throw new Error('Weak password');
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, config.bcryptSaltRounds);
    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await addUser(newUser);

    const payload: TokenPayload = { id: savedUser.id, email: savedUser.email };
    const accessToken = generateAccessToken(payload);
    const refreshToken = await generateRefreshToken(payload);

    return { accessToken, refreshToken };
};

// Use the TokenResponse interface as the return type
export const loginUser = async (email: string, password: string): Promise<TokenResponse> => {
    const user = await getUserByEmail(email);
    if (!user) {
        throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    const payload: TokenPayload = { id: user.id, email: user.email };
    const accessToken = generateAccessToken(payload);
    const refreshToken = await generateRefreshToken(payload);

    return { accessToken, refreshToken };
};

// No need to change the refreshAccessToken function return type since it only returns the accessToken
export const refreshAccessToken = async (refreshToken: string): Promise<string> => {
    const tokenDoc = await RefreshToken.findOne({ token: refreshToken });

    if (!tokenDoc) {
        throw new Error('Invalid refresh token');
    }

    if (tokenDoc.expiresAt < new Date()) {
        throw new Error('Refresh token expired');
    }

    try {
        const payload = jwt.verify(refreshToken, config.refreshTokenSecret) as TokenPayload;
        return generateAccessToken({ id: payload.id, email: payload.email });
    } catch (error) {
        throw new Error('Invalid refresh token');
    }
};
