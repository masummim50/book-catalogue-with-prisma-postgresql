import { Response } from 'express';

type apiResponseType<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta?: metaType;
  data?: T | null;
};
type metaType = {
  page: number;
  limit: number;
  total: number;
};

// const sendResponse = <T>(res: Response, data: IApiReponse<T>): void => {
//   const responseData: IApiReponse<T> = {
//     statusCode: data.statusCode,
//     success: data.success,
//     message: data.message || null,
//     meta: data.meta || null || undefined,
//     data: data.data || null || undefined,
//   };

//   res.status(data.statusCode).json(responseData);
// };

const sendResponse = <T>(
  res: Response,
  statusCode: number,
  success: boolean,
  message: string | null,
  data?: T | null,
  meta?: metaType
): void => {
  const responseData: apiResponseType<T> = {
    statusCode: statusCode,
    success: success,
    message: message || null,
    meta: meta || null || undefined,
    data: data || null || undefined,
  };

  res.status(statusCode).json(responseData);
};

export default sendResponse;
