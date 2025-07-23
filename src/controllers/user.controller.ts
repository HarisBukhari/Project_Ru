import { Request, Response } from 'express';
import userService from '../services/user.service';
import ApiError from '../utils/apiError';

class UserController {
  async getUser(req: Request, res: Response) {
    const userId = req.params.id;
    
    if (!req.user) {
      throw new ApiError(401, 'Unauthorized');
    }
    
    // Check if user is requesting their own data or is admin
    if (req.user.id !== userId && req.user.role !== 'admin') {
      throw new ApiError(403, 'Forbidden');
    }
    
    const user = await userService.findUserById(userId);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    
    res.json(user);
  }

  async getAllUsers(req: Request, res: Response) {
    console.log(req.user)
    if (!req.user || req.user.role !== 'admin') {
      throw new ApiError(403, 'Forbidden');
    }
    
    const users = await userService.findAllUsers();
    res.json(users);
  }

  async updateUserStatus(req: Request, res: Response) {
    const userId = req.params.id;
    const { status } = req.body;
    
    if (!req.user) {
      throw new ApiError(401, 'Unauthorized');
    }
    
    // Check if user is updating their own status or is admin
    if (req.user.id !== userId && req.user.role !== 'admin') {
      throw new ApiError(403, 'Forbidden');
    }
    
    const updatedUser = await userService.updateUserStatus(userId, { status });
    res.json(updatedUser);
  }
}

export default new UserController();