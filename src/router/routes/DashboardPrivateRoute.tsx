import * as React from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Login from "../../pages/AccountLayout/Login/Login";

const DashboardPrivateRoute = ({ children }: { children: JSX.Element }) => {
  const {isAuth} = useTypedSelector(state => state.authReducer);

  if (!isAuth) {
    return <Login/>;
  }

  return children;
};

export default DashboardPrivateRoute;
