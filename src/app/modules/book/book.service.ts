import { Book } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createBook = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
  });
  return result;
};

const getBooks = async (): Promise<Book[]> => {
  const result = await prisma.book.findMany();
  return result;
};

const getBooksByCategoryId = async (categoryId: string): Promise<Book[]> => {
  const result = await prisma.book.findMany({
    where: {
      categoryId,
    },
  });
  return result;
};

export const bookService = {
  createBook,
  getBooks,
  getBooksByCategoryId,
};
