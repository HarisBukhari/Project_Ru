import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export interface IUser extends Document {
  id?: string;
  fullName: string;
  dateOfBirth: Date;
  email: string;
  password: string;
  role: UserRole;
  status: UserStatus;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  fullName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  role: { 
    type: String, 
    enum: {
      values: Object.values(UserRole),
      message: '{VALUE} is not a valid role. Must be either "admin" or "user"'
    },
    default: UserRole.USER,
    required: true
  },
  status: { 
    type: String, 
    enum: {
      values: Object.values(UserStatus),
      message: '{VALUE} is not a valid status. Must be either "active" or "inactive"'
    },
    default: UserStatus.ACTIVE,
    required: true
  },
}, {
  timestamps: true,
  // Enable strict mode for all fields
  strict: 'throw'
});

// Hash password before saving
UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = model<IUser>('User', UserSchema);

export default User;