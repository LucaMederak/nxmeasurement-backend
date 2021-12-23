import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { saltWorkFactor } from '../../../config/config';
import { IUserDocument } from '../interfaces/user.interfaces';

const Schema = mongoose.Schema;

const UserSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: {
      type: String,
      default:
        'https://upload.wikimedia.org/wikipedia/commons/7/7c/User_font_awesome.svg',
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function (next) {
  const user = this as IUserDocument;

  if (!user.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(saltWorkFactor);

  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as IUserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch(() => false);
};

const UserModel = mongoose.model<IUserDocument>('User', UserSchema);

export default UserModel;
