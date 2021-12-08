type values = {
  [ key: string ]: number | string | boolean;
}

export default function RegisterValidation ( values: values ) {
  let errors: values = {};

  ( Object.keys( values ) as Array<string> ).map( key => {

    if ( key === 'create_user_email' && !/\S+@\S+\.\S+/.test( values[ key ].toString() ) ) {
      errors[ key ] = 'Email address is invalid';
    }

    if ( key !== 'acceptance_register' && !values[ key ] ) {
      errors[ key ] = 'This field should not be empty';
    }
  } );

  return errors;
};
