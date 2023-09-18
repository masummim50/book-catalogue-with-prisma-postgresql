import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { categoryService } from './category.service';

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const data = await categoryService.createCategory(req.body);
  sendResponse(res, httpStatus.OK, true, 'Category created Successfully', data);
});
const getCategories = catchAsync(async (req: Request, res: Response) => {
  const data = await categoryService.getCategories();
  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Categories retrieved Successfully',
    data
  );
});
const getCategoryById = catchAsync(async (req: Request, res: Response) => {
  const data = await categoryService.getCategoryById(req.params.id);
  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Category retrieved Successfully',
    data
  );
});
const updateCategoryById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body;
  const data = await categoryService.updateCategoryById(id, payload);
  sendResponse(res, httpStatus.OK, true, 'Category Updated Successfully', data);
});
const deleteCategoryById = catchAsync(async (req: Request, res: Response) => {
  const data = await categoryService.deleteCategoryById(req.params.id);
  sendResponse(res, httpStatus.OK, true, 'Category deleted Successfully', data);
});

export const categoryController = {
  createCategory,
  getCategories,
  getCategoryById,
  deleteCategoryById,
  updateCategoryById,
};
