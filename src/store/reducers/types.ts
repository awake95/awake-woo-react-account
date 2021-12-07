export interface AuthState {
    isAuth: boolean;
}

export type valuesType = {
    [key: string]: string | boolean;
    type?: string;
}

export interface ValuesState {
    selectedValues: {
        loginValues:valuesType,
        registerValues:valuesType;
    }
}

export enum AuthActionsEnum {
    SET_AUTH = "SET_AUTH",
}

export enum SetSelectedActionsEnum {
    SET_VALUES = "SET_VALUES",
}

export interface SetAuthAction {
    type: AuthActionsEnum.SET_AUTH;
    payload: boolean;
}

export interface SetValuesAction {
    type: SetSelectedActionsEnum.SET_VALUES;
    payload: valuesType;
}

export type SetValueAction = SetValuesAction
export type AuthAction = SetAuthAction
