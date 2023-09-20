import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { orderController } from './order.controller';
import { orderValidation } from './order.validation';

const router = express.Router();

router.post(
  '/create-order',
  auth('customer'),
  validateRequest(orderValidation.create),
  orderController.createOrder
);

export const orderRoutes = router;
