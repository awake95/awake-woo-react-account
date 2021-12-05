import * as React from 'react';
import {FC} from 'react';
import {Outlet} from "react-router-dom";

const Account:FC = () => {
    return (
        <div>
            Account
            <Outlet />
        </div>
    );
};

export default Account;
