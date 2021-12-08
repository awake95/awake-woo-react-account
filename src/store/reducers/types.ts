export interface AuthState {
  isAuth: boolean;
}

export type valuesType = {
  [ key: string ]: string | boolean;
}

export interface FormValuesState {
  [ key: string ]: valuesType;
}

export enum AuthActionsEnum {
  SET_AUTH = 'SET_AUTH',
}

export enum FormActionsEnum {
  SET_LOGIN_VALUES = 'SET_LOGIN_VALUES',
  SET_REGISTER_VALUES = 'SET_REGISTER_VALUES',
  REQUEST_STARTED = 'REQUEST_STARTED',
  REQUEST_SUCCEEDED = 'REQUEST_SUCCEEDED',
  REQUEST_FAILED = 'REQUEST_FAILED'
}

export interface SetAuthAction {
  type: AuthActionsEnum.SET_AUTH;
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

export interface SetPostDataAction {
    type: FormActionsEnum.REQUEST_STARTED | FormActionsEnum.REQUEST_SUCCEEDED | FormActionsEnum.REQUEST_FAILED;
    payload: valuesType;
}

export type PostDataAction = SetPostDataAction
export type LoginAction = SetLoginAction
export type RegisterAction = SetRegisterAction
export type AuthAction = SetAuthAction
