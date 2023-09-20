import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { orderService } from './order.service';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?.id;
  const paylaod = req.body;
  const data = await orderService.createOrder(userId, paylaod);
  sendResponse(res, httpStatus.OK, true, 'Order created Successfully', data);
});

export const orderController = {
  createOrder,
};
