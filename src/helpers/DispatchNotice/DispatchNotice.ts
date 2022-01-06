import { ActionsEnum } from '../../store/reducers/types';
import { AppDispatch } from '../../store';

export const dispatchNotice = (type:string, message:string, shown:boolean, dispatch: AppDispatch, time?: number):void => {
  dispatch( { type: ActionsEnum.SET_NOTICE_TYPE, payload: type } );
  dispatch( { type: ActionsEnum.SET_NOTICE_MESSAGE, payload: message } );
  dispatch( { type: ActionsEnum.SET_NOTICE_SHOWN, payload: shown } );

  let timeout:ReturnType<typeof setTimeout> = setTimeout(() => {
    dispatch( { type: ActionsEnum.SET_NOTICE_SHOWN, payload: false } );
    clearTimeout(timeout);
  }, time ?? 10000)
}
