import { Types } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
}

export interface IPassword extends Document {
  user: Types.ObjectId;
  password: string;
}


export interface IProduct extends Document{
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  image1: string;
  image2: string;
  image3: string;
}










