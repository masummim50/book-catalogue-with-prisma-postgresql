import express from 'express';
import { userRoutes } from '../modules/user/user.route';

const router = express.Router();

const routes = [
  {
    path: '/user',
    route: userRoutes,
  },
];

routes.forEach(route => router.use(route.path, route.route));
export default router;
