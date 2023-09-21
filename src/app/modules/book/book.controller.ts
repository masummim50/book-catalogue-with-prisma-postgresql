import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { bookService } from './book.service';

const createBook = catchAsync(async (req: Request, res: Response) => {
  const data = await bookService.createBook(req.body);
  sendResponse(res, httpStatus.OK, true, 'Book created Successfully', data);
});

const getBooks = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
  const filters = pick(req.query, [
    'minPrice',
    'maxPrice',
    'category',
    'search',
  ]);

  const { meta, data } = await bookService.getBooks(options, filters);
  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Book retrieved Successfully',
    data,
    meta
  );
});

const getBooksByCategoryId = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, ['page', 'limit']);
  const { meta, data } = await bookService.getBooksByCategoryId(
    options,
    req.params.id
  );
  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Book retrieved Successfully',
    data,
    meta
  );
});

const getBookById = catchAsync(async (req: Request, res: Response) => {
  const data = await bookService.getBookById(req.params.id);
  sendResponse(res, httpStatus.OK, true, 'Book retrieved Successfully', data);
});

const updateBookById = catchAsync(async (req: Request, res: Response) => {
  const data = await bookService.updateBookById(req.params.id, req.body);
  sendResponse(res, httpStatus.OK, true, 'Book updated Successfully', data);
});

const deleteBookById = catchAsync(async (req: Request, res: Response) => {
  const data = await bookService.deleteBookById(req.params.id);
  sendResponse(res, httpStatus.OK, true, 'Book deleted Successfully', data);
});

export const bookController = {
  createBook,
  getBooks,
  getBooksByCategoryId,
  getBookById,
  updateBookById,
  deleteBookById,
};
