import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import AccountLayout from '../../pages/AccountLayout/AccountLayout';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const {isAuth} = useTypedSelector(state => state.authReducer);

  if (!isAuth) {
    return <Navigate to='/'/>;
  }

  return <AccountLayout>{children}</AccountLayout>;
};

export default PrivateRoute;
