import * as React from 'react';
import Dashboard from '../pages/AccountLayout/Account/Dashboard/Dashboard';
import LostPassword from "../pages/AccountLayout/LostPassword/LostPassword";
import PrivateRoute from "./routes/PrivateRoute";
import {NotPrivateRoute} from "./routes/NotPrivateRoute";
import Orders from "../pages/AccountLayout/Account/Orders/Orders";
import DashboardPrivateRoute from "./routes/DashboardPrivateRoute";
import AccountLayout from '../pages/AccountLayout/AccountLayout';
import PageNotFound from '../pages/AccountLayout/PageNotFound/PageNotFound';

export interface IRoute {
  path: string;
  element: JSX.Element;
  children?: IRoute[];
  index?: boolean;
}

export const RouteNames = {
  account: '/',
  lostPassword: 'lost-password',
  orders: 'orders',
}

const routes = (): IRoute[] => [
  {
    path: RouteNames.account,
    element: <AccountLayout/>,
    children: [
      {
        path: RouteNames.lostPassword,
        element: <LostPassword/>,
      },
      {
        path: RouteNames.orders,
        element: <Orders/>,
      },
      {
        path: '*',
        element: <PageNotFound/>
      }
    ]
  },


];

export default routes;
