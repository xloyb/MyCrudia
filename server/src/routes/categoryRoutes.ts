import { Router } from 'express';
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
} from '@controllers/categoryController';
import { authenticateJWT } from '@middlewares/authMiddleware';

const router = Router();

router.post('/', authenticateJWT, createCategory);  
router.get('/', getCategories);  
router.put('/:id', authenticateJWT, updateCategory);
router.delete('/:id', authenticateJWT, deleteCategory);

export default router;
