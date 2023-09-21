import { Order } from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { orderType } from './order.interface';

const createOrder = async (userId: string, data: orderType): Promise<Order> => {
  console.log('is data: ', data);
  const bookIds: string[] = [];

  data.orderedBooks.forEach(order => {
    bookIds.push(order.bookId);
  });
  const booksExist = await prisma.book.findMany({
    where: {
      id: {
        in: bookIds,
      },
    },
  });

  const allBooksExist = booksExist.length === bookIds.length;
  if (!allBooksExist) {
    throw new ApiError(
      httpStatus.OK,
      'One or more book with provided id does not exist'
    );
  }
  const result = await prisma.order.create({
    data: {
      userId,
      orderedBooks: data.orderedBooks,
    },
  });
  return result;
};

const getAllOrders = async (): Promise<Order[]> => {
  const orders = await prisma.order.findMany();
  return orders;
};

const getAllOrdersOfCustomer = async (id: string): Promise<Order[]> => {
  const orders = await prisma.order.findMany({
    where: {
      userId: id,
    },
  });
  return orders;
};

const getOrderById = async (id: string, user: JwtPayload): Promise<Order> => {
  const order = await prisma.order.findUnique({
    where: {
      id,
    },
  });
  if (!order) {
    throw new ApiError(httpStatus.OK, 'Order not found');
  }
  if (user.role === 'customer') {
    if (order.userId != user.userId) {
      throw new ApiError(
        httpStatus.OK,
        'you are not authorized to view this order'
      );
    }
  }

  return order;
};
export const orderService = {
  createOrder,
  getAllOrders,
  getAllOrdersOfCustomer,
  getOrderById,
};
