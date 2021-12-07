import * as React from 'react';
import {FC, useState} from "react";
import useForm from "../../../hooks/useForm";
import LoginValidation from "../../../helpers/Validation/LoginValidation";
import {useTypedSelector} from "../../../hooks/useTypedSelector";

type formPropTypes = {
    classnames?: string[];
    id: string;
    setSubmitErrors: (errors: { [key:string]: string }) => void;
    submitErrors: {[key:string]: string}
};

const Form:FC<formPropTypes> = ({children, classnames = [], id, setSubmitErrors, submitErrors}) => {
    const selectedValues = useTypedSelector(state => state.selectValues).selectedValues;
    const [ formValid, isFormValid ] = useState<boolean>( false );
    const [ isValueChanged, setIsValueChanged ] = useState<boolean>(false);

    const { values, handleSubmit } = useForm( onSubmitHandler, LoginValidation, id, selectedValues, setIsValueChanged, setSubmitErrors, submitErrors);

    function onSubmitHandler() {
        isFormValid( true );
        console.log(values)
    }

    return (
        <form id={id} className={classnames.join(' ')} encType='multipart/form-data' onSubmit={handleSubmit}>
            {children}
        </form>
    );
};

export default Form;
