// product.validator.ts
import Joi from 'joi';

export const validateCreateProduct = (data: any) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    category: Joi.string().required(),
  });

  return schema.validate(data).error;
};

export const validateUpdateProduct = (data: any) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    category: Joi.string().required(),
  });

  return schema.validate(data).error;
};