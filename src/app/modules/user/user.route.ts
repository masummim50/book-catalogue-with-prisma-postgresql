import express from 'express';
import auth from '../../middlewares/auth';
import { userController } from './user.controller';

const router = express.Router();

router.get('/', auth('admin'), userController.getAllUsers);
router.get('/:id', auth('admin'), userController.getUserById);
router.patch('/:id', auth('admin'), userController.updateUserById);
router.delete('/:id', auth('admin'), userController.deleteUserById);

export const userRoutes = router;
