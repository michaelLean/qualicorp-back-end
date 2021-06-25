import { Document, Schema, model } from 'mongoose';

export interface IClient {
  _id?: string;
  name: string;
  password?: string;
  email: string;
}

interface IClientDocument extends Document {
  name: string;
  password: string;
  email: string;
}

const clientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

export const Client = model<IClientDocument>('Client', clientSchema);
