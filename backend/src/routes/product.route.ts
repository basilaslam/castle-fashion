// product.routes.ts
import { Router } from 'express';
import { 
  getAllProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from '../controllers/product.controller';
import { isAuthenticated } from '../_core/middlewares/jwt.middleware';
import multer from 'multer';
import { storage } from '../_core/services/upload/image_upload.service';

const router = Router();
const upload = multer({ storage});

const commonMiddlewares = [
    isAuthenticated
];

router.get('/product/v1', getAllProducts as any);
router.get('/product/v1/:id', getProductById as any);
router.post('/product/v1', commonMiddlewares,upload.array('productImage',3), createProduct as any);
router.put('/product/v1/:id', commonMiddlewares,upload.array('productImage',3), updateProduct as any);
router.delete('/product/v1/:id', commonMiddlewares, deleteProduct as any);

export default router;