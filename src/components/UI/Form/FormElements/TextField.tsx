import * as React from 'react';
import {ChangeEvent, FC, useState} from "react";

interface textFieldInterface {
    name: string;
    placeholder: string;
    type: string;
    classnames?: string[];
}

const TextField: FC<textFieldInterface> = ({name = 'text', placeholder = '', type = 'text', classnames= []}) => {
    const [value, setValue] = useState<string>('');

    const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }

    return (
        <input className={classnames.join(' ')} value={value} onChange={inputHandler} name={name} placeholder={placeholder} type={type}/>
    );
};

export default TextField;
