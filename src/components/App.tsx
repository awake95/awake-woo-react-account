import * as React from 'react';
import routes from '../router';
import { Route, useRoutes, Routes } from 'react-router';
import './App.scss';
import { FC } from 'react';
import Login from '../pages/AccountLayout/Login/Login';
import PrivateRoute from '../router/PrivateRoute';
import Dashboard from '../pages/AccountLayout/Account/Dashboard/Dashboard';
import AccountLayout from '../pages/AccountLayout/AccountLayout';
import { NotPrivateRoute } from '../router/NotPrivateRoute';

export const settings = window.awmr_localize_variables || {
  site_url          : 'site_url',
  ajax_url          : '/admin-ajax.php',
  i18n              : {},
  nonce             : 'fdsds324234gbfdnonce',
  woo_account_settings: {
    generate_password: false,
    generate_username: false,
    register_form: false,
    user_logged_in: false,
    account_path_name: 'my-account',
  },
};

const App: FC = () => {
  const allRoutes = useRoutes( routes() );

  return (
    <div className="app flex justify-center items-center" style={ { minHeight: '100vh' } }>
      1234
      <Routes>
        <Route path="/my-account" element={<NotPrivateRoute><AccountLayout/></NotPrivateRoute>}>
          <Route path="login" element={<Login />} />
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
      {/*<Route path="*" element={<NotFound />} />*/}
    </div>
  );
};

export default App;
