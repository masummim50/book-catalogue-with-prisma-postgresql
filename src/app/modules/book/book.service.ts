import { Book } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';

const createBook = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
    include: {
      category: true,
    },
  });
  return result;
};

type filterTypes = {
  minprice?: string;
  maxprice?: string;
  category?: string;
  search?: string;
};

const getBooks = async (
  options: IPaginationOptions,
  filters: filterTypes
): Promise<IGenericResponse<Book[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const { minprice, maxprice, category, search } = filters;
  console.log('filters: ', filters);
  const where: any = {};

  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { genre: { contains: search, mode: 'insensitive' } },
      { author: { contains: search, mode: 'insensitive' } },
    ];
  }
  if (category) {
    where.categoryId = category;
  }
  if (minprice !== undefined && maxprice !== undefined) {
    where.price = {
      gte: parseFloat(minprice),
      lte: parseFloat(maxprice),
    };
  } else if (minprice !== undefined) {
    where.price = {
      gte: parseFloat(minprice),
    };
  } else if (maxprice !== undefined) {
    where.price = {
      lte: parseFloat(maxprice),
    };
  }

  console.log('where', where);
  const result = await prisma.book.findMany({
    where,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
  });
  const count = await prisma.book.count({ where });
  const totalPage = Math.ceil(count / limit);
  console.log('totalPage: ', totalPage);

  return {
    meta: {
      page,
      size: limit,
      total: count,
      totalPage,
    },
    data: result,
  };
};

const getBooksByCategoryId = async (
  options: IPaginationOptions,
  categoryId: string
): Promise<IGenericResponse<Book[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const result = await prisma.book.findMany({
    where: {
      categoryId,
    },
    skip,
    take: limit,
  });
  const total = await prisma.book.count({
    where: {
      categoryId,
    },
  });
  const totalPage = Math.ceil(total / limit);
  return {
    meta: {
      page,
      size: limit,
      total,
      totalPage,
    },
    data: result,
  };
};

const getBookById = async (id: string): Promise<Book> => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
  });
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'book not found');
  }
  return result;
};
export const bookService = {
  createBook,
  getBooks,
  getBooksByCategoryId,
  getBookById,
};
