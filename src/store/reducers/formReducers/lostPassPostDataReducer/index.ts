import {
  FormActionsEnum,
  FormPostDataState,
  PostDataType,
  LostPassSetPostDataAction
} from '../../types';

const initialState: FormPostDataState<PostDataType, boolean> = {
  response: {},
  loading: false,
};

export default function lostPassPostDataReducer ( state = initialState, action: LostPassSetPostDataAction ): FormPostDataState<PostDataType, boolean> {
  switch ( action.type ) {
    case FormActionsEnum.LOST_PASS_REQUEST_STARTED:
      return { ...state, loading: true };
    case FormActionsEnum.LOST_PASS_REQUEST_SUCCEEDED:
      return { ...state, loading: false, response: action.payload };
    case FormActionsEnum.LOST_PASS_REQUEST_FAILED:
      return { ...state, loading: false, response: action.payload };
    default:
      return state;
  }
}
