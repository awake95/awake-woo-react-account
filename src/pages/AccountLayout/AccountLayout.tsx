import * as React from 'react';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { settings } from '../../components/App';

const AccountLayout = () => {
  let navigate = useNavigate();

  const { isAuth } = useTypedSelector( state => state.authReducer );

  useEffect( () => {
    if ( !isAuth ) {
      navigate('/' + settings.woo_account_settings.account_path_name + '/login' );
    } else {
      navigate( '/' + settings.woo_account_settings.account_path_name + '/dashboard' );
    }
  }, [ isAuth ] );

  return (
    <div>
      <Outlet/>
    </div>
  );
};

export default AccountLayout;
