import { FormActionsEnum, FormValuesState, LostAction } from '../../types';

const initialState: FormValuesState<{}> = {
  lostPassValues: {
    user_login: '',
  }
};

export default function lostPassReducer ( state = initialState, action: LostAction ): FormValuesState<{}> {
  switch ( action.type ) {
    case FormActionsEnum.SET_LOST_PASS_VALUES:
      console.log(action.payload);
      return {
        ...state,
        lostPassValues: action.payload
      };
    default:
      return state;
  }
}
