import express from 'express';
import { authRoutes } from '../modules/auth/auth.route';
import { bookRoutes } from '../modules/book/book.route';
import { categoryRoutes } from '../modules/category/category.route';
import { orderRoutes } from '../modules/order/order.route';
import { profileRoutes } from '../modules/profile/profile.route';
import { userRoutes } from '../modules/user/user.route';

const router = express.Router();

const routes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/categories',
    route: categoryRoutes,
  },
  {
    path: '/books',
    route: bookRoutes,
  },
  {
    path: '/orders',
    route: orderRoutes,
  },
  {
    path: '/profile',
    route: profileRoutes,
  },
];

routes.forEach(route => router.use(route.path, route.route));
export default router;
