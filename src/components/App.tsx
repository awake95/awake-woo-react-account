import * as React from 'react';
import routes from "../router";
import {useRoutes} from "react-router";
import {useTypedSelector} from "../hooks/useTypedSelector";
import './App.scss'
import { FC } from 'react';

export const settings = window.awmr_localize_variables || {};

const App:FC = () => {

    const {isAuth} = useTypedSelector(state => state.authReducer)
    const allRoutes = useRoutes(routes(isAuth));

    return (
        <div className='app flex justify-center items-center' style={{minHeight: '100vh'}}>
            {allRoutes}
        </div>
    )
};

export default App;
