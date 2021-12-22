import * as React from 'react'
import {render} from 'react-dom'
import App from "./components/App";
import {Provider} from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import {store} from "./store";

export interface IParams {
  site_url: string,
  ajax_url: string,
  i18n: { [ key: string ]: string },
  nonce?: string,
  woo_account_settings: {
    generate_password: boolean,
    generate_username: boolean,
    register_form: boolean,
    user_logged_in: boolean,
    account_path_name: string,
  },
}

type WPObject = {
  passwordStrength: {
    meter: (pass:string, blacklist: string[]) => number,
    userInputDisallowedList: () => string[]
  }
}

declare global {
  export interface Window {
    awmr_localize_variables: IParams;
    wp: WPObject
  }
}

const initialize = () => {
  const awakeWooReactAccount = document.querySelector('#awake-woo-react-account');

  if (awakeWooReactAccount) {
    render(
      <Provider store={store}>
        <BrowserRouter basename='/my-account'>
          <App />
        </BrowserRouter>
      </Provider>,
      awakeWooReactAccount
    )
  }
}

window.addEventListener('DOMContentLoaded', initialize);




