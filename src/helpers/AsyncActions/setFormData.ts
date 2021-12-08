import { AppDispatch } from '../../store';
import { FormActionsEnum } from '../../store/reducers/types';

type dataType = { [ key: string ]: string }

export const setFormData = ( url: string, data: dataType, action: string, nonce: string ) => {
  return ( dispatch: AppDispatch ) => {
    dispatch( { type: FormActionsEnum.REQUEST_STARTED } );

    const form_data = new FormData();

    for ( let key in data ) {
      form_data.append( key, data[ key ] );
    }

    form_data.append( 'action', action );
    form_data.append( 'awmr_nonce', nonce );

    fetch( url, {
      method: 'post',
      body: form_data
    } )
      .then(
        response => dispatch( { type: FormActionsEnum.REQUEST_SUCCEEDED, payload: response } ),
        error => dispatch( { type: FormActionsEnum.REQUEST_FAILED, error: error } )
      );
  };
};
