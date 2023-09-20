import { Order } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { orderType } from './order.interface';

const createOrder = async (
  userId: string,
  data: orderType[]
): Promise<Order> => {
  const result = await prisma.order.create({
    data: {
      userId,
      orderedBooks: data,
    },
  });
  return result;
};

export const orderService = {
  createOrder,
};
