import User, { IUser } from '../models/User';
import { CreateUserInput, UpdateUserStatusInput } from '../types/user.types';
import ApiError from '../utils/apiError';

class UserService {
  async createUser(input: CreateUserInput): Promise<IUser> {
    if (await User.findOne({ email: input.email })) {
      throw new ApiError(400, 'Email already in use');
    }

    const user = await User.create(input);
    return user;
  }

  async findUserById(id: string): Promise<IUser | null> {
    return User.findById(id).select('-password');
  }

  async findAllUsers(): Promise<IUser[]> {
    return User.find().select('-password');
  }

  async updateUserStatus(id: string, input: UpdateUserStatusInput): Promise<IUser | null> {
    const user = await User.findByIdAndUpdate(
      id,
      { status: input.status },
      { 
        new: true,
        runValidators: true,
        context: 'query'    
      },
    ).select('-password');
    
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    
    return user;
  }
}

export default new UserService();