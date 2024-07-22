import { Schema, model } from 'mongoose';
import { IPassword, IUser } from '../_core/interfaces/schema/schema.interface';

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const passwordSchema = new Schema<IPassword>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Password = model<IPassword>('Password', passwordSchema);
const User = model<IUser>('User', userSchema);

export { Password, User };
