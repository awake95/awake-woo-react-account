import * as React from 'react';
import {FC, useState} from "react";

interface textFieldInterface {
    name: string;
    label?: string;
    classnames?: string[];
}

const Checkbox: FC<textFieldInterface> = ({name = 'check', classnames = [], label = 'Check please'}) => {
    const [checked, setChecked] = useState<boolean>(false);

    const checkboxHandler = () => {
        setChecked(value => !value);
    }

    return (
        <div className={classnames.join(' ')}>
            <input id={name} className='checkbox-input hid' checked={checked} onChange={checkboxHandler} name={name}
                   type='checkbox'/>
            <label className='checkbox-label cursor-pointer text-gray-600 text-sm' htmlFor={name}>{label}</label>
        </div>

    );
};

export default Checkbox;

