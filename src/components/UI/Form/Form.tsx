import * as React from 'react';
import {FC} from "react";

type classNamesType = {
    classnames?: string[];
};

const Form:FC<classNamesType> = ({children, classnames = []}) => {

    const onSubmitHandler = (event:React.SyntheticEvent) => {
        event.preventDefault()
    }

    return (
        <form className={classnames.join(' ')} encType='multipart/form-data' onSubmit={onSubmitHandler}>
            {children}
        </form>
    );
};

export default Form;
