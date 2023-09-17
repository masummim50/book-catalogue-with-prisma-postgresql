import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authController } from './auth.controller';
import { authValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(authValidation.create),
  authController.createUser
);
router.post('/signin', authController.login);

export const authRoutes = router;
