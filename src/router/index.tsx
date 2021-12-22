import * as React from 'react';
import Dashboard from '../pages/AccountLayout/Account/Dashboard/Dashboard';
import LostPassword from "../pages/AccountLayout/LostPassword/LostPassword";
import PrivateRoute from "./routes/PrivateRoute";
import {NotPrivateRoute} from "./routes/NotPrivateRoute";
import Orders from "../pages/AccountLayout/Account/Orders/Orders";
import DashboardPrivateRoute from "./routes/DashboardPrivateRoute";

export interface IRoute {
  path: string;
  element: JSX.Element;
  children?: IRoute[];
  index?: boolean;
}

export const RouteNames = {
  account: '/',
  lostPassword: '/lost-password',
  orders: '/orders',
}

const routes = (): IRoute[] => [
  {
    path: RouteNames.lostPassword,
    element: <NotPrivateRoute><LostPassword/></NotPrivateRoute>,
  },
  {
    path: RouteNames.orders,
    element: <PrivateRoute><Orders/></PrivateRoute>,
  },
  {
    path: RouteNames.account,
    element: <DashboardPrivateRoute><Dashboard/></DashboardPrivateRoute>
  },

];

export default routes;
