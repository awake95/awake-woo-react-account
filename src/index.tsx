import * as React from 'react'
import {render} from 'react-dom'
import App from "./components/App";
import {Provider} from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import {store} from "./store";

export interface IParams {
  [key:string]: string | number | boolean
}

declare global {
  export interface Window {
    awmr_localize_variables: IParams;
  }
}

const initialize = () => {
  const awakeWooReactAccount = document.querySelector('#awake-woo-react-account');

  if (awakeWooReactAccount) {

    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
      awakeWooReactAccount
    )
  }
}

window.addEventListener('DOMContentLoaded', initialize);




