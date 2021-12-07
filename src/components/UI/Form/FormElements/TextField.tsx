import * as React from 'react';
import {ChangeEvent, FC, useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {setValuesAction} from "../../../../store/reducers/selectValues";
import {AppDispatch} from "../../../../store";
import useDebounce from "../../../../hooks/useDebounce";

interface textFieldInterface {
    name: string;
    placeholder: string;
    type: string;
    classnames?: string[];
    typeForm: string;
    errors?: {
        [key:string]: string
    };
}

const TextField: FC<textFieldInterface> = ({
                                               name = 'text',
                                               placeholder = '',
                                               type = 'text',
                                               classnames = [],
                                               typeForm,
                                                errors
                                           }) => {
    const [value, setValue] = useState<string>('');
    const dispatch: AppDispatch = useDispatch();
    const debouncedSearchTerm = useDebounce(value, 200);

    const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }

    useEffect(() => {
        if (!debouncedSearchTerm) return;
        dispatch(setValuesAction({[name]: value, typeForm}));
    }, [debouncedSearchTerm])

    return (
        <div className='relative'>
            <input className={classnames.join(' ')} value={value} onChange={inputHandler} name={name}
                   placeholder={placeholder} type={type}/>
            {errors && errors[name] &&
                <span className='absolute text-sm text-red-600 left-0' style={{top: 'calc(100% - 24px)'}}>
                    {errors[name]}
                </span>
            }
        </div>
    );
};

export default TextField;
