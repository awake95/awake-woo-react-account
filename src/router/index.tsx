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

const RouteNames = {
  login: 'login',
  account: location.pathname,
  dashboard: 'dashboard'
}

const dashboardPath = RouteNames.account + '/' + RouteNames.dashboard;

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
        element: !isAuth ? <Login/> : <Navigate to={ dashboardPath }/>,
      }
    ]
  },

];

export default routes;
