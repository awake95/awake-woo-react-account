import * as React from 'react';
import {Link, Outlet} from 'react-router-dom';

const AccountLayout = () => {
  return (
    <div>
        <Link to='/dashboard'>Dashboard</Link>
        <Link to='/login'>Login</Link>
    </div>
  );
};

export default AccountLayout;
