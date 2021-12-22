import * as React from 'react';
import Login from '../pages/AccountLayout/Login/Login';
import Dashboard from '../pages/AccountLayout/Account/Dashboard/Dashboard';
import AccountLayout from '../pages/AccountLayout/AccountLayout';
import LostPassword from '../pages/AccountLayout/LostPassword/LostPassword';
import PrivateRoute from './PrivateRoute';

export interface IRoute {
  path: string;
  element: JSX.Element;
  children?: IRoute[];
  index?: boolean;
}

const settings = window.awmr_localize_variables || {
  woo_account_settings: {
    generate_password: false,
    generate_username: false,
    register_form: false,
    user_logged_in: false,
    account_path_name: 'my-account',
  },
}

export const RouteNames = {
  login: 'login',
  account: '/',
  dashboard: 'dashboard',
  lostPassword: 'lost-password'
}

const routes = (): IRoute[] => [
  {
    path: RouteNames.account,
    element: <AccountLayout/>,
    children: [
      {
        path: RouteNames.dashboard,
        element: <PrivateRoute><Dashboard/></PrivateRoute>
      },
      {
        path: RouteNames.login,
        element: <Login/>,
      },
      {
        path: RouteNames.lostPassword,
        element: <LostPassword/>,
      }
    ]
  },

];

export default routes;
