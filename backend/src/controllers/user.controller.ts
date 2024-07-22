import { Response } from "express";
import { statuses } from "../_core/const/api.statuses";
import { TRequest } from "../_core/interfaces/overrides.interface";
import User from "../models/user.model";

export const getAllUser = async (req: TRequest, res: Response) => {
    try {
      const products = await User.find();
      console.log(products);
      
      return res.status(200).json(products);
    } catch (error) {
      console.log('@getAllProducts error', error);
      return res.status(500).json(statuses['0900']);
    }
  };