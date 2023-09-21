import { User } from '@prisma/client';

export const exclude = (users: any[], keys: any[]): Partial<User>[] => {
  users.forEach(user => {
    keys.forEach(key => {
      delete user[key];
    });
  });
  return users;
};

export const excludeFromOne = <t extends Partial<User>, k extends keyof t>(
  user: t,
  keys: k[]
): Partial<User> => {
  keys.forEach(key => {
    delete user[key];
  });
  return user;
};
