import * as React from 'react';
import routes from '../router';
import { useRoutes } from 'react-router';
import './App.scss';
import { FC } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import Notice from './UI/Notice/Notice';
import { CSSTransition } from 'react-transition-group';

export const settings = window.awmr_localize_variables || {
  site_url: 'site_url',
  ajax_url: '/admin-ajax.php',
  i18n: {},
  nonce: 'fdsds324234gbfdnonce',
  woo_account_settings: {
    generate_password: false,
    generate_username: false,
    register_form: false,
    user_logged_in: false,
    account_path_name: 'my-account',
    endpoints: {},
    logout_url: 'https://woocommerce-421140-2050690.cloudwaysapps.com/wp-login.php?action=logout&amp;redirect_to=https%3A%2F%2Fwoocommerce-421140-2050690.cloudwaysapps.com%2Fmy-account&amp;_wpnonce=62f3d8e041'
  },
};

const App: FC = () => {
  const allRoutes = useRoutes( routes() );
  const isNoticeShown = useTypedSelector( state => state.noticeReducer ).isShown;

  return (
    <div className="app flex justify-center items-center">
      <CSSTransition in={isNoticeShown} unmountOnExit={true} timeout={300} classNames="notice">
        <Notice/>
      </CSSTransition>
      { allRoutes }
    </div>
  );
};

export default App;
