import mongoose, { Document } from 'mongoose';
import { IUser } from './userModel';

export interface IRefreshToken extends Document {
    userId: IUser;
    token: string;
    expiresAt: Date;
    createdAt: Date;
}

const RefreshTokenSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
});

export const RefreshToken = mongoose.model<IRefreshToken>('RefreshToken', RefreshTokenSchema);
