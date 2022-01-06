import * as React from 'react';
import { Navigate } from 'react-router';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Login from '../../pages/AccountLayout/Login/Login';
import AccountLayout from '../../pages/AccountLayout/AccountLayout';


export const NotPrivateRoute = ({ children }: { children: JSX.Element }) => {
  const {isAuth} = useTypedSelector((state) => state.authReducer);

  if (isAuth) {
    return <Navigate to='/'/>
  }

  return <AccountLayout>{children}</AccountLayout>

};
