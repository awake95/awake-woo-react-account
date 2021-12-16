import { FormActionsEnum, FormValuesState, PostDataAction, RegisterAction } from '../types';

const initialState: FormValuesState = {
  postData: {}
};

export default function postDataReducer ( state = initialState, action: PostDataAction ): FormValuesState {
  switch ( action.type ) {
    case FormActionsEnum.REQUEST_SUCCEEDED:
      return {...state, postData: action.payload}
    default:
      return state;
  }
}
