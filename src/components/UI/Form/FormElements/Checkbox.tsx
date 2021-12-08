import * as React from 'react';
import {FC, useEffect, useState} from "react";
import {AppDispatch} from "../../../../store";
import {useDispatch} from "react-redux";

interface textFieldInterface {
    name: string;
    label?: string;
    classnames?: string[];
    setIsValueChanged: (value:boolean) => void;
    actionType?: string;
}

const Checkbox: FC<textFieldInterface> = ({name = 'check', classnames = [], label = 'Check please', setIsValueChanged, actionType}) => {
    const [checked, setChecked] = useState<boolean>(false);
    const dispatch: AppDispatch = useDispatch();

    const checkboxHandler = () => {
        setChecked(value => !value);
        setIsValueChanged(true);
    }

    useEffect(() => {
        if (!actionType) return;
        dispatch({type: actionType, payload: {[name]: checked}});
    }, [checked])

    return (
        <div className={classnames.join(' ')}>
            <input id={name} className='checkbox-input hid' checked={checked} onChange={checkboxHandler} name={name}
                   type='checkbox'/>
            <label className='checkbox-label cursor-pointer text-gray-600 text-sm' htmlFor={name}>{label}</label>
        </div>

    );
};

export default Checkbox;

