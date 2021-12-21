import { AppDispatch } from '../../store';

type dataType = { [ key: string ]: any }

export const setFormData = ( url: string, data: dataType, action: string, actionTypeStarted:string, actionTypeFailed:string, actionTypeSucceed:string, nonce?: string) => {
  return async ( dispatch: AppDispatch ) => {
    const formData = new FormData();
    dispatch( { type: actionTypeStarted, payload: {loading: true} } );

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
          dispatch( { type: actionTypeStarted, payload: {loading: false} } );
          res.text().then( value => {
            dispatch( { type: actionTypeSucceed, payload: JSON.parse( value ) } );
          } );
        } else {
          res.text().then(value => {
            dispatch( { type: actionTypeFailed, payload: JSON.parse( value ) } );
          })
          console.log( 'something wrong with server and res is not ok' );
        }
      } )
      .catch( err => console.error( err ) );

  };
};
