import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { authService } from './auth.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const payload: User = { ...req.body };
  const salt = await bcrypt.genSalt(10);
  payload.password = await bcrypt.hash(payload.password, salt);

  const result = await authService.createUser(payload);

  sendResponse(res, httpStatus.OK, true, `User created Successfully`, result);
});

const login = catchAsync(async (req: Request, res: Response) => {
  const data = await authService.login(req.body);

  sendResponse(
    res,
    httpStatus.OK,
    true,
    'User signed in successfully',
    undefined,
    undefined,
    data
  );
});

export const authController = {
  createUser,
  login,
};
