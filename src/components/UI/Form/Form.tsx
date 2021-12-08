import * as React from 'react';
import {FC} from "react";
import useForm from "../../../hooks/useForm";
import {useTypedSelector} from "../../../hooks/useTypedSelector";

type formPropTypes = {
    classnames?: string[];
    id: string;
    setSubmitErrors: (errors: { [key:string]: string }) => void;
    submitErrors: {[key:string]: string};
    isValueChanged: boolean;
    setIsValueChanged: (value:boolean) => void;
    validation: (values: object, id:string) => object;
    formValueObjectName: string;
};

const Form:FC<formPropTypes> = ({children, classnames = [], id, setSubmitErrors, submitErrors, isValueChanged, setIsValueChanged, validation, formValueObjectName}) => {
    let selectedValues = useTypedSelector(state => state.loginReducer);

    if (formValueObjectName === 'registerValues') {
        selectedValues = useTypedSelector(state => state.registerReducer);
    }

    const onSubmitHandler = () => {
        if (!isValueChanged) return;
        console.log(submitErrors);
        console.log(values)

        setIsValueChanged(false);
    }

    const { values, handleSubmit } = useForm( onSubmitHandler, validation, id, selectedValues[formValueObjectName], setSubmitErrors, submitErrors);

    return (
        <form noValidate id={id} className={classnames.join(' ')} encType='multipart/form-data' onSubmit={handleSubmit}>
            {children}
        </form>
    );
};

export default Form;
