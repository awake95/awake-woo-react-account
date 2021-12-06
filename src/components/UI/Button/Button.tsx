import * as React from 'react';
import {FC} from "react";

interface propsInterface extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    classnames?: string[];
}

const Button: FC<propsInterface> = ({type, disabled, classnames = [], children}) => {
    return (
        <button className={classnames.join(' ')} type={type} disabled={disabled ?? false}>
            {children}
        </button>
    );
};

export default Button;
