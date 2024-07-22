import { type Response } from 'express';
import Product from '../models/product.model';
import { validateCreateProduct, validateUpdateProduct } from '../_core/validators/product.validator';
import { statuses } from '../_core/const/api.statuses';
import { TRequest } from '../_core/interfaces/overrides.interface';
import multer from 'multer';
import { fileFilter, storage, uploadImage } from '../_core/services/upload/image_upload.service';


const upload = multer({ storage: storage, fileFilter: fileFilter });

export const getAllProducts = async (req: TRequest, res: Response) => {
  try {
    const products = await Product.find();
    console.log(products);
    
    return res.status(200).json(products);
  } catch (error) {
    console.log('@getAllProducts error', error);
    return res.status(500).json(statuses['0900']);
  }
};

export const getProductById = async (req: TRequest, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json(statuses['02']);
    }
    return res.status(200).json(product);
  } catch (error) {
    console.log('@getProductById error', error);
    return res.status(500).json(statuses['0900']);
  }
};


export const createProduct = async (req: TRequest, res: Response) => {

const productData = req.body;

  const error = validateCreateProduct(productData);
  
  if (error) {
    return res.status(400).json({
      ...statuses['501'],
      error: error.details[0].message.replace(/['"]/g, ''),
    });
  }

  const files = req.files as Express.Multer.File[];

  try {
    // Upload images
    const uploadedImages = await uploadImage(files, 'products');
    
    // Restructure the images data
    productData.image1 = '';
    productData.image2 = '';
    productData.image3 = '';
  
    if (Array.isArray(uploadedImages)) {
      uploadedImages.forEach((img, index) => {
        if (index < 3) {
          productData[`image${index + 1}`] = img.secure_url;
        }
      });
    } else if (uploadedImages) {
      productData.image1 = uploadedImages.secure_url;
    }
  
    console.log('productData with images:', productData);
  
    const newProduct = new Product(productData);
    const savedProduct = await newProduct.save();
    return res.status(201).json(savedProduct);
  } catch (error) {
    console.error('@createProduct error', error);
    return res.status(500).json(statuses['0900']);
  }
};

export const updateProduct = async (req: TRequest, res: Response) => {

  const productData = req.body;
  const productId = req.params.id;

  const error = validateUpdateProduct(productData);

  if (error) {
    return res.status(400).json({
      ...statuses['501'],
      error: error.details[0].message.replace(/['"]/g, ''),
    });
  }

  const files = req.files as Express.Multer.File[];

  try {
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json(statuses['02']);
    }

    if (files && files.length > 0) {
      const uploadedImages = await uploadImage(files, 'products');
      
      // Restructure the images data
      productData.image1 = existingProduct.image1;
      productData.image2 = existingProduct.image2;
      productData.image3 = existingProduct.image3;
    
      if (Array.isArray(uploadedImages)) {
        uploadedImages.forEach((img, index) => {
          if (index < 3) {
            productData[`image${index + 1}`] = img.secure_url;
          }
        });
      } else if (uploadedImages) {
        productData.image1 = uploadedImages.secure_url;
      }
    }

    console.log('productData with updated images:', productData);

    const updatedProduct = await Product.findByIdAndUpdate(productId, productData, { new: true });
    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('@updateProduct error', error);
    return res.status(500).json(statuses['0900']);
  }
};

export const deleteProduct = async (req: TRequest, res: Response) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json(statuses['02']);
    }
    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.log('@deleteProduct error', error);
    return res.status(500).json(statuses['0900']);
  }
};