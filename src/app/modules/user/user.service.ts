import { User } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { exclude, excludeFromOne } from '../../../shared/excludeFunction';
import prisma from '../../../shared/prisma';

const getAllUsers = async (): Promise<Partial<User>[]> => {
  const users = await prisma.user.findMany();
  const reformed = await exclude(users, ['password']);
  return reformed;
};

const getUserById = async (id: string): Promise<Partial<User> | null> => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  let reformed = {};
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
  }
  reformed = await excludeFromOne(user, ['password']);
  return reformed;
};

const updateUserById = async (
  id: string,
  payload: Partial<User>
): Promise<Partial<User>> => {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });
  console.log('after update returns: ', user);
  return excludeFromOne(user, ['password']);
};
const deleteUserById = async (id: string) => {
  const user = await prisma.user.delete({
    where: {
      id,
    },
  });
  return excludeFromOne(user, ['password']);
};

export const userService = {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
