import * as React from 'react';
import { FC, useState } from 'react';
import Form from '../../../components/UI/Form/Form';
import TextField from '../../../components/UI/Form/FormElements/TextField';
import Button from '../../../components/UI/Button/Button';
import Checkbox from '../../../components/UI/Form/FormElements/Checkbox';
import { FormActionsEnum } from '../../../store/reducers/types';
import LoginValidation from '../../../helpers/Validation/LoginValidation';
import RegisterValidation from '../../../helpers/Validation/RegisterValidation';
import { settings } from '../../../components/App';

type errorsType = {
  [ key: string ]: string
}

const Login: FC = () => {
  const isRegFormVisible = settings ? !!+settings.register_form : false;
  const [ loginSubmitErrors, setLoginSubmitErrors ] = useState<errorsType>( {} );
  const [ registerSubmitErrors, setRegisterSubmitErrors ] = useState<errorsType>( {} );
  const [ isValueChanged, setIsValueChanged ] = useState<boolean>( false );

  return (
    <div className={["flex flex-wrap md:flex-nowrap items-stretch", ( !isRegFormVisible ? 'justify-start' : 'justify-between' )].join(' ')}>
      <Form id="login-form"
            classnames={ [ 'bg-white', 'w-full', 'md:mr-4', 'mb-4', 'md:mb-0', 'rounded', 'shadow-md', 'p-4', ( !isRegFormVisible ? 'md:w-full' : 'md:w-1/2' ) ] }
            isValueChanged={ isValueChanged } setIsValueChanged={ setIsValueChanged }
            setSubmitErrors={ setLoginSubmitErrors } submitErrors={ loginSubmitErrors } validation={ LoginValidation }
            formValueObjectName="loginValues">
        <h2 className="mb-2 text-xl">Login</h2>
        <p className="text-gray-600 mb-4">Please fill the form to login in your account</p>
        <TextField actionType={ FormActionsEnum.SET_LOGIN_VALUES } errors={ loginSubmitErrors }
                   setIsValueChanged={ setIsValueChanged }
                   classnames={ [ 'w-full', 'border-2', 'mb-6', 'border-gray-300', 'rounded', 'p-2' ] } name="username"
                   placeholder="Enter your login/email" type="text"/>
        <TextField actionType={ FormActionsEnum.SET_LOGIN_VALUES } errors={ loginSubmitErrors }
                   setIsValueChanged={ setIsValueChanged }
                   classnames={ [ 'w-full', 'border-2', 'mb-6', 'border-gray-300', 'rounded', 'p-2' ] } name="password"
                   placeholder="Enter your password" type="password"/>
        <Checkbox actionType={ FormActionsEnum.SET_LOGIN_VALUES } setIsValueChanged={ setIsValueChanged }
                  classnames={ [ 'mb-6' ] } name="remember_me" label="Remember me"/>
        <Button classnames={ [ 'btn', 'btn--primary' ] } type="submit">Login</Button>
      </Form>

      {
        isRegFormVisible &&
        <Form id="register-form"
              classnames={ [ 'bg-white', 'w-full', 'md:w-1/2', 'md:ml-4', 'mb-4', 'md:mb-0', 'rounded', 'shadow-md', 'p-4' ] }
              isValueChanged={ isValueChanged } setIsValueChanged={ setIsValueChanged }
              setSubmitErrors={ setRegisterSubmitErrors } submitErrors={ registerSubmitErrors }
              validation={ RegisterValidation } formValueObjectName="registerValues">
          <h2 className="mb-2 text-xl">Register</h2>
          <p className="text-gray-600 mb-4">Don't have any accounts? Fill the form and we will register you</p>
          <TextField actionType={ FormActionsEnum.SET_REGISTER_VALUES } setIsValueChanged={ setIsValueChanged }
                     errors={ registerSubmitErrors }
                     classnames={ [ 'w-full', 'border-2', 'mb-6', 'border-gray-300', 'rounded', 'p-2' ] }
                     name="create_username" placeholder="Your login" type="text"/>
          <TextField actionType={ FormActionsEnum.SET_REGISTER_VALUES } setIsValueChanged={ setIsValueChanged }
                     errors={ registerSubmitErrors }
                     classnames={ [ 'w-full', 'border-2', 'mb-6', 'border-gray-300', 'rounded', 'p-2' ] }
                     name="create_user_email" placeholder="Your email" type="email"/>
          <TextField actionType={ FormActionsEnum.SET_REGISTER_VALUES } setIsValueChanged={ setIsValueChanged }
                     errors={ registerSubmitErrors }
                     classnames={ [ 'w-full', 'border-2', 'mb-6', 'border-gray-300', 'rounded', 'p-2' ] }
                     name="create_password" placeholder="Your password" type="password"/>
          <Checkbox actionType={ FormActionsEnum.SET_REGISTER_VALUES } setIsValueChanged={ setIsValueChanged }
                    classnames={ [ 'mb-6' ] } name="acceptance_register"
                    label="Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy."/>
          <Button classnames={ [ 'btn', 'btn--primary' ] } type="submit">Register</Button>
        </Form>
      }
    </div>
  );
};

export default Login;
