import express from 'express';
import auth from '../../middlewares/auth';
import { categoryController } from './category.controller';

const router = express.Router();

router.post(
  '/create-category',
  auth('admin'),
  categoryController.createCategory
);
router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getCategoryById);
router.patch('/:id', auth('admin'), categoryController.updateCategoryById);
router.delete('/:id', auth('admin'), categoryController.deleteCategoryById);

export const categoryRoutes = router;
