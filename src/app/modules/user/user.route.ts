import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { userController } from './user.controller';
import { userValidation } from './user.validation';

const router = express.Router();

router.get('/', auth('admin'), userController.getAllUsers);
router.get('/:id', auth('admin'), userController.getUserById);
router.patch(
  '/:id',
  auth('admin'),
  validateRequest(userValidation.update),
  userController.updateUserById
);
router.delete('/:id', auth('admin'), userController.deleteUserById);

export const userRoutes = router;
