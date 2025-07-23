export interface CreateUserInput {
  fullName: string;
  dateOfBirth: Date;
  email: string;
  password: string;
  role?: 'admin' | 'user';
}

export interface LoginUserInput {
  email: string;
  password: string;
}

export interface UpdateUserStatusInput {
  status: 'active' | 'inactive';
}