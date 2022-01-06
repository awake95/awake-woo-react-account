export interface AuthState {
  isAuth: boolean;
}

export type valuesType = {
  [ key: string ]: string | boolean;
}

export interface FormValuesState<T extends valuesType> {
  [ key: string ]: T;
}

export interface FormPostDataState<T, B> {
  response: T,
  loading: B
}

export type PostDataType = {
  message?: {[key: string]: string},
  created?: boolean,
  loggedin?: boolean,
  lost_password?: boolean,
}

export enum ActionsEnum {
  SET_AUTH = 'SET_AUTH',
  SET_NOTICE_SHOWN = 'SET_NOTICE_SHOWN',
  SET_NOTICE_MESSAGE = 'SET_NOTICE_MESSAGE',
  SET_NOTICE_TYPE = 'SET_NOTICE_TYPE',
}

export enum FormActionsEnum {
  SET_LOGIN_VALUES = 'SET_LOGIN_VALUES',
  SET_REGISTER_VALUES = 'SET_REGISTER_VALUES',
  SET_LOST_PASS_VALUES = 'SET_LOST_PASS_VALUES',
  LOGIN_REQUEST_STARTED = 'LOGIN_REQUEST_STARTED',
  LOGIN_REQUEST_SUCCEEDED = 'LOGIN_REQUEST_SUCCEEDED',
  LOGIN_REQUEST_FAILED = 'LOGIN_REQUEST_FAILED',
  REG_REQUEST_STARTED = 'REG_REQUEST_STARTED',
  REG_REQUEST_FAILED = 'REG_REQUEST_FAILED',
  REG_REQUEST_SUCCEEDED = 'REG_REQUEST_SUCCEEDED',
  LOST_PASS_REQUEST_STARTED = 'LOST_PASS_REQUEST_STARTED',
  LOST_PASS_REQUEST_FAILED = 'LOST_PASS_REQUEST_FAILED',
  LOST_PASS_REQUEST_SUCCEEDED = 'LOST_PASS_REQUEST_SUCCEEDED'
}

export interface SetAuthAction {
  type: ActionsEnum.SET_AUTH;
  payload: boolean;
}

export interface SetLoginAction {
  type: FormActionsEnum.SET_LOGIN_VALUES;
  payload: valuesType;
}

export interface SetRegisterAction {
  type: FormActionsEnum.SET_REGISTER_VALUES;
  payload: valuesType;
}

export interface SetLostPassAction {
  type: FormActionsEnum.SET_LOST_PASS_VALUES;
  payload: valuesType;
}

export interface SetNoticeShownAction {
  type: ActionsEnum.SET_NOTICE_SHOWN ;
  payload: boolean;
}

export interface SetNoticeTypeAction {
  type: ActionsEnum.SET_NOTICE_TYPE ;
  payload: string;
}

export interface SetNoticeMessageAction {
  type: ActionsEnum.SET_NOTICE_MESSAGE ;
  payload: string;
}

export interface LoginSetPostDataAction {
    type: FormActionsEnum.LOGIN_REQUEST_STARTED | FormActionsEnum.LOGIN_REQUEST_SUCCEEDED | FormActionsEnum.LOGIN_REQUEST_FAILED;
    payload: valuesType;
}

export interface RegisterSetPostDataAction {
  type: FormActionsEnum.REG_REQUEST_STARTED | FormActionsEnum.REG_REQUEST_SUCCEEDED | FormActionsEnum.REG_REQUEST_FAILED;
  payload: valuesType;
}

export interface LostPassSetPostDataAction {
  type: FormActionsEnum.LOST_PASS_REQUEST_STARTED | FormActionsEnum.LOST_PASS_REQUEST_SUCCEEDED | FormActionsEnum.LOST_PASS_REQUEST_FAILED;
  payload: valuesType;
}

export interface INoticeState {
  isShown: boolean;
  message: string;
  type: string;
}

export type LoginAction = SetLoginAction
export type LostAction = SetLostPassAction
export type RegisterAction = SetRegisterAction
export type AuthAction = SetAuthAction
export type NoticeAction = SetNoticeShownAction | SetNoticeTypeAction | SetNoticeMessageAction
