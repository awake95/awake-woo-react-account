import React from 'react';
import routes from "../router";
import {useRoutes} from "react-router";
import {useTypedSelector} from "../hooks/useTypedSelector";
import './App.module.scss'

const App = () => {
    const {isAuth} = useTypedSelector(state => state.auth)
    return useRoutes(routes(isAuth));
};

export default App;
