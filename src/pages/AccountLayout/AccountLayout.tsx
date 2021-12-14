import * as React from 'react';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const AccountLayout = () => {
  let navigate = useNavigate(),
    location = useLocation();

  const { isAuth } = useTypedSelector( state => state.authReducer );

  useEffect( () => {
    if ( !isAuth ) {
      navigate( location.pathname + '/login' );
    } else {
      navigate( location.pathname + '/dashboard' );
    }
  }, [ isAuth ] );

  return (
    <div>
      <Outlet/>
    </div>
  );
};

export default AccountLayout;
