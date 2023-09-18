import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const getAllUsers = async (): Promise<User[]> => {
  const users = await prisma.user.findMany();
  return users;
};

const getUserById = async (id: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
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
  return user;
};
const deleteUserById = async (id: string) => {
  const user = await prisma.user.delete({
    where: {
      id,
    },
  });
  return user;
};

export const userService = {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
