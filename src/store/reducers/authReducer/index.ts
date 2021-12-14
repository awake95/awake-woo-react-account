import {AuthAction, AuthActionsEnum, AuthState} from "../types";
import { settings } from '../../../components/App'

const initialState:AuthState = {
    isAuth: settings ? !!+settings.user_logged_in : false
}

export default function authReducer(state= initialState, action:AuthAction): AuthState {
    switch (action.type) {
        case AuthActionsEnum.SET_AUTH:
            return {...state, isAuth: action.payload}
        default:
            return state
    }
}
