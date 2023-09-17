import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { loginDataType } from './auth.interface';

const createUser = async (data: User): Promise<Partial<User>> => {
  const result = await prisma.user.create({
    data,
  });
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { password, ...others } = result;
  return others;
};

const login = async (data: loginDataType): Promise<string> => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'user not found');
  }
  // compare password
  const isPasswordMatch = await bcrypt.compare(data.password, user.password);
  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid credentials');
  }

  const token = jwtHelpers.createToken(
    {
      role: user.role,
      userId: user.id,
    },
    config.jwt.secret as Secret,
    '1 year'
  );
  return token;
};

export const authService = {
  createUser,
  login,
};
