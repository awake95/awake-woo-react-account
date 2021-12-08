import { FormActionsEnum, FormValuesState, LoginAction } from '../types';

const initialState: FormValuesState = {
  loginValues: {
    username: '',
    password: '',
    remember_me: false
  }
};

export default function setLoginValuesReducer ( state = initialState, action: LoginAction ): FormValuesState {
  switch ( action.type ) {
    case FormActionsEnum.SET_LOGIN_VALUES:
      console.log( action.payload );
      let newState = Object.assign( state.loginValues, {
        ...state.loginValues,
        ...action.payload,
      } );
      return {
        ...state,
        loginValues: newState
      };
    default:
      return state;
  }
}
