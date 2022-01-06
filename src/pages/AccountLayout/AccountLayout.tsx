import * as React from 'react';
import { FC } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Login from './Login/Login';
import Dashboard from './Account/Dashboard/Dashboard';
import Sidebar from '../../components/Sidebar/Sidebar';

const AccountLayout: FC = () => {
  const { isAuth } = useTypedSelector( state => state.authReducer );
  const location = useLocation();

  if ( !isAuth ) {
    return <Login/>;
  }

  return (
    <div className='flex w-full'>
      <Sidebar/>
      {
        location.pathname === '/' &&
        <Dashboard/>
      }
      <Outlet/>
    </div>
  );
};

export default AccountLayout;
