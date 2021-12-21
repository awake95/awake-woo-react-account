import * as React from 'react';
import { FC, useEffect } from 'react';
import useForm from '../../../hooks/useForm';
import { setFormData } from '../../../helpers/AsyncActions/setFormData';
import { settings } from '../../App';
import { useDispatch } from 'react-redux';
import { AuthActionsEnum, FormActionsEnum, FormPostDataState, PostDataType } from '../../../store/reducers/types';
import Spinner from '../Spinner/Spinner';

type formPropTypes = {
  classnames?: string[];
  id: string;
  setSubmitErrors: ( errors: { [ key: string ]: string } ) => void;
  submitErrors: { [ key: string ]: string };
  isValueChanged: boolean;
  setIsValueChanged: ( value: boolean ) => void;
  validation: ( values: object ) => object;
  selectedValues: { [ key: string ]: string | boolean };
  responseData: FormPostDataState<PostDataType, boolean>
};

type values = {
  [ key: string ]: string;
}

const Form: FC<formPropTypes> = ( {
  children,
  classnames = [],
  id,
  setSubmitErrors,
  submitErrors,
  isValueChanged,
  setIsValueChanged,
  validation,
  selectedValues,
  responseData
} ) => {
  const dispatch = useDispatch();

  const { handleSubmit } = useForm( onSubmitHandler, validation, selectedValues, setSubmitErrors, submitErrors );

  function onSubmitHandler () {
    if ( !isValueChanged ) return;

    if ( id === 'login-form' ) {
      dispatch( setFormData( settings.ajax_url, selectedValues, 'awmr_login_user_action', FormActionsEnum.LOGIN_REQUEST_STARTED, FormActionsEnum.LOGIN_REQUEST_FAILED, FormActionsEnum.LOGIN_REQUEST_SUCCEEDED, settings.nonce ) );
      setIsValueChanged( false );
    }

    if ( id === 'register-form' ) {
      dispatch( setFormData( settings.ajax_url, selectedValues, 'awmr_register_user_action', FormActionsEnum.REG_REQUEST_STARTED, FormActionsEnum.REG_REQUEST_FAILED, FormActionsEnum.REG_REQUEST_SUCCEEDED, settings.nonce ) );
      setIsValueChanged( false );
    }

    if (id === 'lost-password-form') {
      dispatch( setFormData( settings.ajax_url, selectedValues, 'awmr_lost_password_action', FormActionsEnum.LOST_PASS_REQUEST_STARTED, FormActionsEnum.LOST_PASS_REQUEST_FAILED, FormActionsEnum.LOST_PASS_REQUEST_SUCCEEDED, settings.nonce ) );
      setIsValueChanged( false );
    }
  }

  useEffect( () => {
    const response = responseData.response;
    if ( Object.keys( response ).length === 0 ) return;

    if ( id === 'login-form' ) {
      if ( response.loggedin ) {
        dispatch( { type: AuthActionsEnum.SET_AUTH, payload: response.loggedin } );
      } else {
        ( Object.keys( response.message ).length > 0 && Object.keys( response.message ) as Array<string> ).map( key => {
          let errors: values = {};
          const message = response.message;

          if ( key.includes( 'username' ) || key.includes( 'email' ) ) {
            errors[ 'username' ] = message[ key ];
          } else {
            errors[ 'password' ] = message[ key ];
          }

          setSubmitErrors( errors );

        } );
      }
    }

    if ( id === 'register-form' ) {
      if ( response.created ) {
        dispatch( { type: AuthActionsEnum.SET_AUTH, payload: response.created } );
      } else {
        let errors: values = {};
        const message = response.message;
        if ( message.toString().includes( 'email' ) ) {
          errors[ 'create_user_email' ] = message.toString();
        }

        if (message.toString().includes('username')) {
          errors[ 'create_username' ] = message.toString();
        }

        setSubmitErrors( errors );
      }
    }

    if (id === 'lost-password-form') {
      if ( !response.lost_password ) {
        let errors:values = {}
        errors[ 'user_login' ] = response.message.toString();
        setSubmitErrors(errors);
      }
    }

  }, [ responseData.response ] );

  return (
    <form noValidate id={ id } className={ classnames.join( ' ' ) } encType="multipart/form-data"
          onSubmit={ handleSubmit }>
      { responseData.loading && <Spinner/> }
      { children }
    </form>

  );
};

export default Form;
