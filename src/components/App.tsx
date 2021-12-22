import * as React from 'react';
import routes from '../router';
import {useRoutes} from 'react-router';
import './App.scss';
import {FC} from 'react';
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useLocation} from "react-router-dom";

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
        account_path_name: '/',
    },
};

const App: FC = () => {
    const allRoutes = useRoutes(routes());

    return (
        <div className="app flex justify-center items-center" style={{minHeight: '100vh'}}>
            {allRoutes}
        </div>
    );
};

export default App;
