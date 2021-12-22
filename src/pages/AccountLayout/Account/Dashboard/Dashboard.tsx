import * as React from 'react';
import {FC} from 'react';
import {Link, Outlet} from "react-router-dom";

const Dashboard:FC = () => {
    return (
        <div>
            <Link to={'/account'}>Account</Link>
            <Outlet/>
        </div>
    );
};

export default Dashboard;
