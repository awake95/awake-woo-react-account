import { check_password_strength } from '../CheckPassword';

type values = {
  [ key: string ]: number | string | boolean;
}

export default function LostPasswordValidation ( values: values ) {
  let errors: values = {};

  ( Object.keys( values ) as Array<string> ).map( key => {

    if (key === 'user_login') {
      if (values[ key ].toString().includes('@') && !/\S+@\S+\.\S+/.test( values[ key ].toString() )) {
        errors[ key ] = 'Email address is invalid';
      }
    }

    if ( !values[ key ] ) {
      errors[ key ] = 'This field should not be empty';
    }
  } );

  return errors;
}
