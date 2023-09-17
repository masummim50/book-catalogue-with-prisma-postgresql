import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createUser = async (data: User): Promise<Partial<User>> => {
  const result = await prisma.user.create({
    data,
  });
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { password, ...others } = result;
  return others;
};

export const userService = {
  createUser,
};
