import { Router } from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '@controllers/productController';
import { authenticateJWT } from '@middlewares/authMiddleware';

const router = Router();

router.post('/', authenticateJWT, createProduct);  
router.get('/', getProducts);                     
router.get('/:id', getProductById);
router.put('/:id', authenticateJWT, updateProduct); 
router.delete('/:id', authenticateJWT, deleteProduct); 

export default router;
