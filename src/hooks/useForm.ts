import * as React from "react";
import {useState, useEffect} from 'react';

const useForm = (callback: () => void, validate: (values: object, id:string) => object, id:string, selectedValues: object, setIsValueChanged: (boolean: boolean) => void, setSubmitErrors:(errors:object) => void, submitErrors: {[key:string]: string}) => {

    const [values, setValues] = useState(selectedValues);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (Object.keys(submitErrors).length === 0 && isSubmitting) {
            callback();
        }
    }, [submitErrors]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitErrors(validate(values, id));
        setIsSubmitting(true);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        setValues(values => ({...values, [event.target.name]: event.target.value}));
        setIsValueChanged(true);
    };

    return {
        handleChange,
        handleSubmit,
        values,
    }
};

export default useForm;
