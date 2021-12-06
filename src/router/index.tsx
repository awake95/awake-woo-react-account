import * as React from 'react'
import Account from "../pages/Account/Account";
import Login from "../pages/Login/Login";
import {Navigate} from 'react-router-dom';
import Dashboard from "../pages/Account/Dashboard/Dashboard";

export interface IRoute {
    path: string;
    element: JSX.Element;
    children?: IRoute[];
}

export enum RouteNames {
    APP = '/',
    LOGIN = '/login',
    ACCOUNT = '/account',
    DASHBOARD = 'dashboard'
}

const routes = (isAuth: boolean): IRoute[] => [
    {
        path: RouteNames.APP,
        element: isAuth ? <Navigate to={RouteNames.ACCOUNT}/> : <Navigate to={RouteNames.LOGIN}/>
    },
    {
        path: RouteNames.ACCOUNT,
        element: isAuth ? <Account/> : <Navigate to={RouteNames.LOGIN}/>,
        children: [
            {
                path:  RouteNames.DASHBOARD,
                element: <Dashboard/>
            }
        ]
    },
    {
        path: RouteNames.LOGIN,
        element: !isAuth ? <Login/> : <Navigate to={RouteNames.ACCOUNT}/>,
    },
];

export default routes;
