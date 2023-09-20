import { z } from 'zod';

const create = z.object({
  body: z.object({
    orderedBooks: z.array(
      z.object({
        bookId: z.string(),
        quantity: z.number(),
      })
    ),
  }),
});

export const orderValidation = {
  create,
};
