import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { bookController } from './book.controller';
import { bookValidation } from './book.validation';

const router = express.Router();

router.post(
  '/create-book',
  auth('admin'),
  validateRequest(bookValidation.create),
  bookController.createBook
);
router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBookById);
router.get('/:id/categoryId', bookController.getBooksByCategoryId);
router.patch(
  '/:id',
  auth('admin'),
  validateRequest(bookValidation.update),
  bookController.updateBookById
);
router.delete('/:id', auth('admin'), bookController.deleteBookById);

export const bookRoutes = router;
