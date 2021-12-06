import * as React from 'react'
import {FC} from 'react'
import Form from "../../components/UI/Form/Form";
import TextField from "../../components/UI/Form/FormElements/TextField";
import Button from "../../components/UI/Button/Button";
import Checkbox from "../../components/UI/Form/FormElements/Checkbox";

const Login:FC = () => {
    return (
        <div className='flex items-stretch justify-between'>
            <Form classnames={['bg-white', 'w-1/2', 'mr-4' , 'rounded', 'shadow-md', 'p-4']}>
                <h2 className='mb-2 text-xl'>Login</h2>
                <p className='text-gray-600 mb-4'>Please fill the form to login in your account</p>
                <TextField classnames={['w-full', 'border-2', 'mb-4', 'border-gray-300', 'rounded', 'p-2']} name='username' placeholder='Enter your login/email' type='text'/>
                <TextField classnames={['w-full', 'border-2', 'mb-4', 'border-gray-300', 'rounded', 'p-2']} name='password' placeholder='Enter your password' type='password'/>
                <Checkbox classnames={['mb-4']} name='acceptance_login' label='I accept privacy policy'/>
                <Button classnames={['btn', 'btn--primary']} type='submit'>Login</Button>
            </Form>

            <Form classnames={['bg-white', 'w-1/2', 'ml-4' , 'rounded', 'shadow-md', 'p-4']}>
                <h2 className='mb-2 text-xl'>Register</h2>
                <p className='text-gray-600 mb-4'>Don't have any accounts? Fill the form and we well register you</p>
                <TextField classnames={['w-full', 'border-2', 'mb-4', 'border-gray-300', 'rounded', 'p-2']} name='create_user_email' placeholder='Your email' type='email'/>
                <TextField classnames={['w-full', 'border-2', 'mb-4', 'border-gray-300', 'rounded', 'p-2']} name='create_password' placeholder='Password' type='password'/>
                <TextField classnames={['w-full', 'border-2', 'mb-4', 'border-gray-300', 'rounded', 'p-2']} name='repeat_create_password' placeholder='Repeat password' type='password'/>
                <Checkbox classnames={['mb-4']} name='acceptance_register' label='Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy.'/>
                <Button classnames={['btn', 'btn--primary']} type='submit'>Register</Button>
            </Form>
        </div>
    );
};

export default Login;
