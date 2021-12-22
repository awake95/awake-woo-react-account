import {AuthAction, AuthActionsEnum, AuthState} from "../types";
import { settings } from '../../../components/App'

const initialState:AuthState = {
    isAuth: !!+settings.woo_account_settings.user_logged_in ?? false
}

export default function authReducer(state= initialState, action:AuthAction): AuthState {
    switch (action.type) {
        case AuthActionsEnum.SET_AUTH:
            console.log('auth is changed');
            return {...state, isAuth: action.payload}
        default:
            return state
    }
}
