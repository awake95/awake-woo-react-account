import * as React from "react";
import {useState, useEffect} from 'react';

const useForm = (callback: () => void, validate: (values: object, id:string) => object, id:string, selectedValues: object, setSubmitErrors:(errors:object) => void, submitErrors: {[key:string]: string}) => {

    const values = selectedValues;
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

    return {
        handleSubmit,
        values,
    }
};

export default useForm;
