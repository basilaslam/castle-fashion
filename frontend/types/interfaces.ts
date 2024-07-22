export interface IProduct extends Document{
    _id: string;
    createdAt: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    category: string;
    image1: string;
    image2: string;
    image3: string;
  }


  export interface IUser extends Document {
    _id: string;
    username: string;
    email: string;
    password: string;
    createdAt: string;
    role: 'user' | 'admin';
  }