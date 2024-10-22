import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    password: string;
}

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
});

export const User = mongoose.model<IUser>('User', UserSchema);

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
    return User.findOne({ email });
};

export const addUser = async (user: IUser): Promise<IUser> => {
    return user.save();
};
