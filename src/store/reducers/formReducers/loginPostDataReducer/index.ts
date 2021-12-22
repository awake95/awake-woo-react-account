import { FormActionsEnum, FormPostDataState, PostDataType, LoginSetPostDataAction } from '../../types';

const initialState: FormPostDataState<PostDataType, boolean> = {
  response: {},
  loading: false,
};

export default function loginPostDataReducer ( state = initialState, action: LoginSetPostDataAction ): FormPostDataState<PostDataType, boolean> {
  switch ( action.type ) {
    case FormActionsEnum.LOGIN_REQUEST_STARTED:
      return { ...state, loading: true };
    case FormActionsEnum.LOGIN_REQUEST_FAILED:
      return { ...state, loading: false, response: action.payload };
    case FormActionsEnum.LOGIN_REQUEST_SUCCEEDED:
      return { ...state, loading: false, response: action.payload };
    default:
      return state;
  }
}
