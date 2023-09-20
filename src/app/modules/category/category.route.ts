import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { categoryController } from './category.controller';
import { categoryValidation } from './category.validation';

const router = express.Router();

router.post(
  '/create-category',
  auth('admin'),
  validateRequest(categoryValidation.create),
  categoryController.createCategory
);
router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getCategoryById);
router.patch('/:id', auth('admin'), categoryController.updateCategoryById);
router.delete('/:id', auth('admin'), categoryController.deleteCategoryById);

export const categoryRoutes = router;
