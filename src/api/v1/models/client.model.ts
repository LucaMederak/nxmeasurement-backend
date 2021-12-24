import mongoose from 'mongoose';
import { IClientDocument } from '../interfaces/client.interfaces';

const Schema = mongoose.Schema;

const ClientSchema = new Schema<IClientDocument>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String },
    sex: { type: String, required: true },
    age: { type: Number, required: true },
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

const ClientModel = mongoose.model<IClientDocument>('Client', ClientSchema);

export default ClientModel;
