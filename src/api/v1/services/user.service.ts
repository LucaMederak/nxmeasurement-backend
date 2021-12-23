import { FilterQuery } from 'mongoose';
import { omit } from 'lodash';
import UserModel from '@models/user.model';
import { IUserInput, IUserDocument } from '@interfaces/user.interfaces';

export async function createUser(input: IUserInput) {
  try {
    const user = await UserModel.create(input);

    return omit(user.toJSON(), 'password');
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function getUser(query: FilterQuery<IUserDocument>) {
  return UserModel.findOne(query).lean().select('-password');
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) return false;

  return omit(user.toJSON(), 'password');
}

export async function validateEmail(email: string) {
  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    return true;
  }

  return false;
}
