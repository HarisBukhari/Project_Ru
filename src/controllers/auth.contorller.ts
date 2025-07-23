import { Request, Response } from 'express';
import authService from '../services/auth.service';
import userService from '../services/user.service';
import { generateToken } from '../utils/jwt';

class AuthController {
  async register(req: Request, res: Response) {
    const user = await userService.createUser(req.body);
    // Exclude password from response
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    
    res.status(201).json(userWithoutPassword);
  }

  async login(req: Request, res: Response) {
    const user = await authService.login(req.body);
    
    const token = generateToken(user);
    
    // Exclude password from response
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    
    res.json({
      user: userWithoutPassword,
      token
    });
  }
}

export default new AuthController();