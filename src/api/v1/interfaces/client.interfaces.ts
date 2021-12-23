import mongoose from 'mongoose';
import { IUserDocument } from './user.interfaces';

export interface IClientInput {
  user: IUserDocument['_id'];
  name: string;
  last_name: string;
  sex: 'mężczyzna' | 'kobieta';
  age: number;
  email?: string;
  avatar: string;
}

export interface IClientDocument extends IClientInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}
