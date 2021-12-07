import {SetValueAction, SetSelectedActionsEnum, ValuesState, valuesType} from "../types";

const initialState:ValuesState = {
    selectedValues: {
        loginValues: {
            username: '',
            password: '',
            rememberMe: false
        },
        registerValues: {
            create_password: '',
            create_user_email: '',
            create_username: '',
            acceptance: false
        }
    }
}

export default function setSelectedValues(state= initialState, action:SetValueAction): ValuesState {
    switch (action.type) {
        case SetSelectedActionsEnum.SET_VALUES:
            let newState = Object.assign(state.selectedValues, {
                    loginValues: {
                    ...state.selectedValues.loginValues,
                    ...(action.payload.typeForm === 'login' ? action.payload : {}),
                    },
                    registerValues: {
                        ...state.selectedValues.registerValues,
                        ...(action.payload.typeForm === 'register' ? action.payload : {}),
                    }
                });
            return {
                ...state,
                ...newState
            };
        default:
            return state
    }
}

export const setValuesAction = (payload: valuesType) => ( { type: SetSelectedActionsEnum.SET_VALUES, payload } );
