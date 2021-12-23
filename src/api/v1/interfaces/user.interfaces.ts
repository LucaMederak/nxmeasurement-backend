import mongoose from 'mongoose';

export interface IUserInput {
  name: string;
  last_name: string;
  email: string;
  password: string;
  avatar?: string;
}

export interface IUserDocument extends IUserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
