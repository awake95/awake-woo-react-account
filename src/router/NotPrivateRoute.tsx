import * as React from 'react';
import { Navigate } from 'react-router';
import {useNavigate} from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { settings } from '../components/App';
import Dashboard from '../pages/AccountLayout/Account/Dashboard/Dashboard';
import Login from '../pages/AccountLayout/Login/Login';


export const NotPrivateRoute = ({ children }: { children: JSX.Element }) => {
  const {isAuth} = useTypedSelector((state) => state.authReducer);
  const navigate = useNavigate();
  if (isAuth) {
    navigate('/my-account/dashboard', {replace: true})
    return <Dashboard/>
  }else {
    navigate('/my-account/login', {replace: true})
    return <Login/>
  }

};
