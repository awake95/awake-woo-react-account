import { FormActionsEnum, FormPostDataState, PostDataType, RegisterSetPostDataAction } from '../../types';

const initialState:FormPostDataState<PostDataType, boolean> = {
  response: {},
  loading: false,
};

export default function registerPostDataReducer ( state = initialState, action: RegisterSetPostDataAction):FormPostDataState<PostDataType, boolean> {
  switch ( action.type ) {
    case FormActionsEnum.REG_REQUEST_STARTED:
      return {...state, loading: true}
    case FormActionsEnum.REG_REQUEST_FAILED:
      return {...state, loading: false, response: action.payload}
    case FormActionsEnum.REG_REQUEST_SUCCEEDED:
      return {...state, loading: false, response: action.payload}
    default:
      return state;
  }
}
