import { z } from 'zod';

const create = z.object({
  body: z.object({
    name: z.string({ required_error: 'name is required' }),
    email: z.string({ required_error: 'email is required' }),
    password: z.string({ required_error: 'password is required' }),
    role: z.enum(['customer', 'admin'], { required_error: 'role is required' }),
    contactNo: z.string({ required_error: 'contact information is required' }),
    address: z.string({ required_error: 'address is required' }),
    profileImg: z.string({ required_error: 'profileImg url is required' }),
  }),
});

const login = z.object({
  body: z.object({
    email: z.string({ required_error: 'email is required' }),
    password: z.string({ required_error: 'password is required' }),
  }),
});

export const authValidation = {
  create,
  login,
};
