import { FormActionsEnum, FormValuesState, RegisterAction } from '../types';

const initialState: FormValuesState = {
  registerValues: {
    create_username: '',
    create_user_email: '',
    create_password: '',
    acceptance_register: false,
  }
};

export default function setRegisterValuesReducer ( state = initialState, action: RegisterAction ): FormValuesState {
  switch ( action.type ) {
    case FormActionsEnum.SET_REGISTER_VALUES:
      let newState = Object.assign( state.registerValues, {
        ...state.registerValues,
        ...action.payload,
      } );
      return {
        ...state,
        registerValues: newState
      };
    default:
      return state;
  }
}
