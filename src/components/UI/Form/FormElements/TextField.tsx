import * as React from 'react';
import { ChangeEvent, FC, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store';
import useDebounce from '../../../../hooks/useDebounce';
import { LoginAction, FormActionsEnum, valuesType } from '../../../../store/reducers/types';
import { check_password_strength } from '../../../../helpers/CheckPassword';

interface textFieldInterface {
  name: string;
  placeholder: string;
  type: string;
  classnames?: string[];
  errors?: {
    [ key: string ]: string
  };
  actionType?: string;
  setIsValueChanged: ( value: boolean ) => void;
  showPassword?: boolean;
  checkStrong?: boolean;
}

const TextField: FC<textFieldInterface> = ( {
  name = 'text',
  placeholder = '',
  type = 'text',
  classnames = [],
  actionType,
  errors,
  setIsValueChanged,
  showPassword = false,
  checkStrong = false
} ) => {
  const [ value, setValue ] = useState<string>( '' );
  const [ passType, setPassType ] = useState<{ type: string, shown: boolean }>( {
    type: 'password',
    shown: false
  } );
  const [ strongPassText, setStrongPassText ] = useState<string>( '' );
  const dispatch: AppDispatch = useDispatch();
  const debouncedSearchTerm = useDebounce( value, 200 );

  const strengthChecker = ( password: string ) => {
    if ( !checkStrong ) return;
    const strength = check_password_strength(password)
    setStrongPassText(strength);

    setTimeout( function () {
      setStrongPassText( '' );
    }, 3000 );
  };

  const inputHandler = ( event: ChangeEvent<HTMLInputElement> ) => {
    setValue( event.target.value.trim() );
  };

  const showPasswordHandler = () => {
    setPassType( { type: 'text', shown: true } );

    if ( passType.shown ) {
      setPassType( { type: 'password', shown: false } );
    }
  };

  useEffect( () => {
    setIsValueChanged( true );
    if ( !actionType ) return;
    if ( type === 'password' && debouncedSearchTerm ) {
      strengthChecker( value );
    }
    dispatch( { type: actionType, payload: { [ name ]: value } } );
  }, [ debouncedSearchTerm ] );

  return (
    <div className="relative mb-3">
      <div className="relative">
        <input
          className={ [ classnames.join( ' ' ), errors && errors[ name ] ? 'border-red-600' : '', ( showPassword ? 'pr-7' : '' ) ].join( ' ' ) }
          value={ value } onChange={ inputHandler } name={ name }
          placeholder={ placeholder } type={ showPassword ? passType.type : type }/>

        { showPassword ?
          passType.shown ?
            <svg onClick={ showPasswordHandler } xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                 className="bi bi-eye-slash absolute cursor-pointer top-1/2 right-2 transform -translate-y-1/2"
                 viewBox="0 0 16 16">
              <path
                d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
              <path
                d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
              <path
                d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
            </svg>
            :
            <svg onClick={ showPasswordHandler } xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                 className="bi bi-eye absolute cursor-pointer top-1/2 right-2 transform -translate-y-1/2"
                 viewBox="0 0 16 16">
              <path
                d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
            </svg>
          : ''
        }
      </div>

      { strongPassText &&
      <span
        className={ [ 'absolute text-sm text-red-600 right-0', ( strongPassText === 'good' ? 'text-yellow-500' : '' ), ( strongPassText === 'strong' ? 'text-green-500' : '' ) ].join( ' ' ) }
        style={ { top: 'calc(100% + 4px)', fontSize: '0.675rem' } }>{ strongPassText }</span>
      }

      { errors && errors[ name ] &&
      <span className="text-red-600 flex items-center block mt-1" style={ { fontSize: '0.675rem' } }>
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        className="bi bi-exclamation-triangle-fill mr-2" viewBox="0 0 16 16" style={{width: '30px'}}>
            <path
              d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
          </svg>
        <span dangerouslySetInnerHTML={ { __html: errors[ name ] } }/>
        </span>
      }
    </div>
  );
};

export default TextField;
