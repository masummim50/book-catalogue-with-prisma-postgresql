import { Category } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const createCategory = async (data: Category): Promise<Category> => {
  const category = await prisma.category.create({
    data,
  });
  return category;
};

const getCategories = async (): Promise<Category[]> => {
  const result = await prisma.category.findMany();
  return result;
};

const getCategoryById = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
    include: {
      books: true,
    },
  });
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'category does not exist');
  }
  return result;
};

const updateCategoryById = async (
  id: string,
  payload: Category
): Promise<Category> => {
  const result = await prisma.category.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteCategoryById = async (id: string) => {
  // in order to delete a category all the books under this category hast to be deleted
  const batch = await prisma.$transaction(async tx => {
    await tx.book.deleteMany({
      where: {
        categoryId: id,
      },
    });
    // book deleted
    const result = await tx.category.delete({
      where: {
        id,
      },
    });
    return result;
  });

  return batch;
};

export const categoryService = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
