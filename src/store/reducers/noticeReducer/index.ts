import { ActionsEnum, INoticeState, NoticeAction } from '../types';

const initialState:INoticeState = {
  isShown: false,
  message: '',
  type: ''
}

export default function noticeReducer(state= initialState, action:NoticeAction): INoticeState {
  switch (action.type) {
    case ActionsEnum.SET_NOTICE_SHOWN:
      return {...state, isShown: action.payload}
    case ActionsEnum.SET_NOTICE_MESSAGE:
      return {...state, message: action.payload}
    case ActionsEnum.SET_NOTICE_TYPE:
      return {...state, type: action.payload}
    default:
      return state
  }
}
