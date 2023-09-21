import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { orderService } from './order.service';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?.userId;
  const paylaod = req.body;
  const data = await orderService.createOrder(userId, paylaod);
  sendResponse(res, httpStatus.OK, true, 'Order created Successfully', data);
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  if (req?.user?.role === 'admin') {
    const data = await orderService.getAllOrders();
    sendResponse(
      res,
      httpStatus.OK,
      true,
      'Orders retrieved Successfully',
      data
    );
  }
  if (req?.user?.role === 'customer') {
    const data = await orderService.getAllOrdersOfCustomer(req?.user?.userId);

    sendResponse(
      res,
      httpStatus.OK,
      true,
      'Orders retrieved Successfully',
      data
    );
  }
});

const getOrderById = catchAsync(async (req: Request, res: Response) => {
  if (req.user) {
    const data = await orderService.getOrderById(req.params.id, req?.user);
    sendResponse(
      res,
      httpStatus.OK,
      true,
      'order retrieved successfully',
      data
    );
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You are not authorized');
  }
});

export const orderController = {
  createOrder,
  getAllOrders,
  getOrderById,
};
