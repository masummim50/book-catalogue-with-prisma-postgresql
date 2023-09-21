import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { profileService } from './profile.service';

const getProfile = catchAsync(async (req: Request, res: Response) => {
  if (req.user) {
    const data = await profileService.getProfile(req.user.userId);
    sendResponse(
      res,
      httpStatus.OK,
      true,
      'Profile Retrieved successfully',
      data
    );
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You are not authorizedffff');
  }
});

export const profileController = {
  getProfile,
};
