import * as React from "react";
import {useState, useEffect} from 'react';

const useForm = (callback: () => void, validate: (values: object) => object, selectedValues: object, setSubmitErrors:(errors:object) => void, submitErrors: {[key:string]: string}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (Object.keys(submitErrors).length === 0 && isSubmitting) {
            callback();
        }
    }, [submitErrors]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitErrors(validate(selectedValues));
        setIsSubmitting(true);
    };

    return {
        handleSubmit,
    }
};

export default useForm;
