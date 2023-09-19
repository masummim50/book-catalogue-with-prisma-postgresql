import express from 'express';
import auth from '../../middlewares/auth';
import { bookController } from './book.controller';

const router = express.Router();

router.post('/create-book', auth('admin'), bookController.createBook);
router.get('/', bookController.getBooks);
router.get('/:id/categoryId', bookController.getBooksByCategoryId);

export const bookRoutes = router;
