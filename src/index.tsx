import * as React from 'react'
import {render} from 'react-dom'
import App from "./components/App";
import {Provider} from "react-redux";
import {BrowserRouter} from 'react-router-dom'
import {store} from "./store";

const awakeWooReactAccount = document.querySelector('#awake-woo-react-account');

if (awakeWooReactAccount) {
    render(
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>,
        awakeWooReactAccount
    )
}


