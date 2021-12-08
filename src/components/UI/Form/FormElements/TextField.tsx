import * as React from 'react';
import {ChangeEvent, FC, useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../../store";
import useDebounce from "../../../../hooks/useDebounce";
import {LoginAction, FormActionsEnum, valuesType} from "../../../../store/reducers/types";


interface textFieldInterface {
    name: string;
    placeholder: string;
    type: string;
    classnames?: string[];
    errors?: {
        [key: string]: string
    };
    actionType?: string;
    setIsValueChanged: (value: boolean) => void;
}

const TextField: FC<textFieldInterface> = ({
                                               name = 'text',
                                               placeholder = '',
                                               type = 'text',
                                               classnames = [],
                                               actionType,
                                               errors,
                                               setIsValueChanged,
                                           }) => {
    const [value, setValue] = useState<string>('');
    const [strongPassText, setStrongPassText] = useState<string>('');
    const dispatch: AppDispatch = useDispatch();
    const debouncedSearchTerm = useDebounce(value, 200);

    const strengthChecker = (password:string) => {
      let strongPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"),
        mediumPassword = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

        if(strongPassword.test(password)) {
          setStrongPassText('Strong');
        } else if(mediumPassword.test(password)) {
          setStrongPassText('Medium');
        } else {
          setStrongPassText('Weak');
        }

        setTimeout(function () {
          setStrongPassText('');
        }, 3000)
  }

    const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }



    useEffect(() => {
        setIsValueChanged(true);
        if (!actionType) return;
        if (type === 'password' && debouncedSearchTerm) {
          strengthChecker(value);
        }
        dispatch({type: actionType, payload: {[name]: value}});
    }, [debouncedSearchTerm])

    return (
        <div className='relative'>
            <input className={[classnames.join(' '), errors && errors[name] ? 'border-red-600': ''].join(' ')} value={value} onChange={inputHandler} name={name}
                   placeholder={placeholder} type={type}/>
            {strongPassText &&
              <span className={['absolute text-sm text-red-600 left-0', (strongPassText === 'Medium' ? 'text-yellow-500' : ''), (strongPassText === 'Strong' ? 'text-green-500' : '')].join(' ')} style={{top: 'calc(100% - 24px)'}}>{strongPassText}</span>
            }
            {errors && errors[name] &&
            <span className='absolute text-sm text-red-600 left-0' style={{top: 'calc(100% - 24px)'}}>
                    {errors[name]}
                </span>
            }
        </div>
    );
};

export default TextField;
