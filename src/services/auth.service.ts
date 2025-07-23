import User, { IUser } from '../models/User';
import { LoginUserInput } from '../types/user.types';
import ApiError from '../utils/apiError';

class AuthService {
  async login(input: LoginUserInput): Promise<IUser> {
    const user = await User.findOne({ email: input.email }).select('+password');
    
    if (!user || !(await user.comparePassword(input.password))) {
      throw new ApiError(401, 'Invalid credentials');
    }
    
    if (user.status !== 'active') {
      throw new ApiError(403, 'Account is inactive');
    }
    
    return user;
  }
}

export default new AuthService();