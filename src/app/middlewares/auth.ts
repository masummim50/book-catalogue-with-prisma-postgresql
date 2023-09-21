import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { jwtHelpers } from '../../helpers/jwtHelpers';

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    console.log('inside auth function');
    try {
      console.log('inside try block');
      //get authorization token
      const token = req.headers.authorization;
      console.log('token:  ', token);
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }
      // verify token
      let verifiedUser = null;
      console.log(config.jwt.secret);
      verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
      console.log('verified user: ', verifiedUser);
      req.user = verifiedUser; // role  , userid

      // role diye guard korar jnno
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'You are not authorized');
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
