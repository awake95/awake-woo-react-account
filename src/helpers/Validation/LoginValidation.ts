type values = {
    [key:string] : number | string;
}

export default function LoginValidation ( values:values, id:string ) {
    let errors:values = {};
    const formValues = id === 'login-form' ? values.loginValues : values.registerValues;

    // if ( !values.customer_email ) {
    //     errors.customer_email = 'Email address is required';
    // } else if ( !/\S+@\S+\.\S+/.test( values.customer_email ) ) {
    //     errors.customer_email = 'Email address is invalid';
    // }

    (Object.keys( formValues ) as Array<keyof typeof formValues>).map( key => {
        const keyString = key.toString();
        if (keyString !== 'rememberMe' && keyString !== 'acceptance' && !formValues[key] ) {
            errors[ key ] = 'This field should not be empty';
            console.log( errors );
        }
    } );




    return errors;
};
