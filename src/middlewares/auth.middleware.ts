import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/apiError';
import User, { IUser } from '../models/User';
import { verifyToken } from '../utils/jwt';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new ApiError(401, 'No token provided');
    }
    
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      throw new ApiError(401, 'User not found');
    }
    
    req.user = user;
    next();
  } catch (error) {
    next(new ApiError(401, 'Unauthorized'));
  }
};

export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'admin') {
    throw new ApiError(403, 'Forbidden - Admin access required');
  }
  next();
};