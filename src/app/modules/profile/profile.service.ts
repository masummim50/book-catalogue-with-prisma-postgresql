import { User } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { excludeFromOne } from '../../../shared/excludeFunction';
import prisma from '../../../shared/prisma';

const getProfile = async (userId: string): Promise<Partial<User>> => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
  }
  return excludeFromOne(user, ['password']);
};

export const profileService = {
  getProfile,
};
