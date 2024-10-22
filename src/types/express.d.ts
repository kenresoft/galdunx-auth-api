import { Request } from 'express'
import { IUser } from '../models/userModel';

// Interface for JWT payload
interface TokenPayload {
    id: string;
    email: string;
}

// Extended Request Interface
declare module 'express' {
    export interface CustomRequest extends Request {
        user?: IUser;
    }
}
