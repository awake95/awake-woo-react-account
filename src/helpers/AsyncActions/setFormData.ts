import { FormActionsEnum } from '../../store/reducers/types';
import { AppDispatch } from '../../store';

type dataType = { [ key: string ]: any }

export const setFormData = ( url: string, data: dataType, action: string, nonce?: string ) => {
  return async ( dispatch: AppDispatch ) => {
    const formData = new FormData();

    for ( let key in data ) {
      formData.append( key, data[ key ] );
    }

    formData.append( 'action', action );

    if ( nonce ) {
      formData.append( 'awmr_nonce', nonce );
    }

    await fetch( url, {
      method: 'post',
      body: formData
    } )
      .then( res => {
        if ( res.ok ) {
          res.text().then( value => {
            dispatch( { type: FormActionsEnum.REQUEST_SUCCEEDED, payload: JSON.parse( value ) } );
          } );
        } else {
          console.log( 'something wrong with server and res is not ok' );
        }
      } )
      .catch( err => console.error( err ) );

  };
};
