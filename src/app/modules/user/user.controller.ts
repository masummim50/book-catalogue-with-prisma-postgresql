import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { userService } from './user.service';

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const data = await userService.getAllUsers();
  sendResponse(res, httpStatus.OK, true, 'Users retrieved Successfully', data);
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
  const data = await userService.getUserById(req.params.id);
  sendResponse(res, httpStatus.OK, true, 'User retrieved Successfully', data);
});

const updateUserById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body;
  const data = await userService.updateUserById(id, payload);
  sendResponse(res, httpStatus.OK, true, 'User updated Successfully', data);
});

const deleteUserById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = await userService.deleteUserById(id);
  sendResponse(res, httpStatus.OK, true, 'User deleted Successfully', data);
});

export const userController = {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
