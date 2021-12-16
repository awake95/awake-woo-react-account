import * as React from 'react';
import Login from '../pages/AccountLayout/Login/Login';
import { Navigate } from 'react-router-dom';
import Dashboard from '../pages/AccountLayout/Account/Dashboard/Dashboard';
import AccountLayout from '../pages/AccountLayout/AccountLayout';

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

const RouteNames = {
  login: 'login',
  account: '/' + settings.woo_account_settings.account_path_name,
  dashboard: 'dashboard'
}

const routes = ( isAuth: boolean ): IRoute[] => [
  {
    path: RouteNames.account,
    element: <AccountLayout/>,
    children: [
      {
        path: RouteNames.dashboard,
        element: <Dashboard/>
      },
      {
        path: RouteNames.login,
        element: <Login/>,
      }
    ]
  },

];

export default routes;
