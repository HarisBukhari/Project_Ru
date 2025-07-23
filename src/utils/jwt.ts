// src/utils/jwt.ts
import jwt from 'jsonwebtoken';
import { IUser } from '../models/User';

const secret = process.env.JWT_SECRET || 'your-secret-key';

export const generateToken = (user: IUser): string => {
  return jwt.sign({ id: user.id, role: user.role }, secret, {
    expiresIn: '1d',
  });
};

export const verifyToken = (token: string): { id: string; role: string } => {
  return jwt.verify(token, secret) as { id: string; role: string };
};