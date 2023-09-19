import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { bookService } from './book.service';

const createBook = catchAsync(async (req: Request, res: Response) => {
  const data = await bookService.createBook(req.body);
  sendResponse(res, httpStatus.OK, true, 'Book created Successfully', data);
});

const getBooks = catchAsync(async (req: Request, res: Response) => {
  const data = await bookService.getBooks();
  sendResponse(res, httpStatus.OK, true, 'Book retrieved Successfully', data);
});

const getBooksByCategoryId = catchAsync(async (req: Request, res: Response) => {
  const data = await bookService.getBooksByCategoryId(req.params.id);
  sendResponse(res, httpStatus.OK, true, 'Book retrieved Successfully', data);
});

export const bookController = {
  createBook,
  getBooks,
  getBooksByCategoryId,
};
