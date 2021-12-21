import * as React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  let location = useLocation();

  const {isAuth} = useTypedSelector(state => state.authReducer);

  if (!isAuth) {
    return <Navigate to="/my-account/login" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
