import * as React from 'react';
import { FC, useEffect } from 'react';
import useForm from '../../../hooks/useForm';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { setFormData } from '../../../helpers/AsyncActions/setFormData';
import { settings } from '../../App';
import { useDispatch } from 'react-redux';
import { AuthActionsEnum } from '../../../store/reducers/types';

type formPropTypes = {
  classnames?: string[];
  id: string;
  setSubmitErrors: ( errors: { [ key: string ]: string } ) => void;
  submitErrors: { [ key: string ]: string };
  isValueChanged: boolean;
  setIsValueChanged: ( value: boolean ) => void;
  validation: ( values: object, id: string ) => object;
  selectedValues: { [ key: string ]: any };
};

const Form: FC<formPropTypes> = ( {
  children,
  classnames = [],
  id,
  setSubmitErrors,
  submitErrors,
  isValueChanged,
  setIsValueChanged,
  validation,
  selectedValues
} ) => {

  let postData = useTypedSelector( state => state.postDataReducer ).postData;
  const currentValues = id === 'register-form' ? 'registerValues' : 'loginValues';
  const dispatch = useDispatch();

  const {
    values,
    handleSubmit
  } = useForm( onSubmitHandler, validation, id, selectedValues, setSubmitErrors, submitErrors );

  function onSubmitHandler () {
    if ( !isValueChanged ) return;

    if ( currentValues === 'loginValues' ) {
      dispatch( setFormData( settings.ajax_url, values, 'awmr_login_user_action', settings.nonce ) );
      setIsValueChanged(false);
    }

    if ( currentValues === 'registerValues' ) {
      dispatch( setFormData( settings.ajax_url, values, 'awmr_register_user_action', settings.nonce ) );
      setIsValueChanged(false);
    }
  }

  useEffect( () => {
    if ( Object.keys( postData ).length === 0 ) return;

    if ( currentValues === 'loginValues' ) {
      dispatch( { type: AuthActionsEnum.SET_AUTH, payload: postData.loggedin } );
    }

  }, [ postData ] );

  return (
    <form noValidate id={ id } className={ classnames.join( ' ' ) } encType="multipart/form-data"
          onSubmit={ handleSubmit }>
      { children }
    </form>
  );
};

export default Form;
