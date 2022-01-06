import * as React from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Login from "../../pages/AccountLayout/Login/Login";
import AccountLayout from '../../pages/AccountLayout/AccountLayout';

const DashboardPrivateRoute = ({ children }: { children: JSX.Element }) => {
  const {isAuth} = useTypedSelector(state => state.authReducer);

  if (!isAuth) {
    return <AccountLayout><Login/></AccountLayout>;
  }

  return <AccountLayout>{children}</AccountLayout>;
};

export default DashboardPrivateRoute;
