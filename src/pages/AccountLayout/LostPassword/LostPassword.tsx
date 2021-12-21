import * as React from 'react';
import Form from '../../../components/UI/Form/Form';
import { useState } from 'react';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import LostPasswordValidation from '../../../helpers/Validation/LostPasswordValidation';
import TextField from '../../../components/UI/Form/FormElements/TextField';
import Button from '../../../components/UI/Button/Button';
import { FormActionsEnum } from '../../../store/reducers/types';

const LostPassword = () => {
  const [ lostPasswordSubmitErrors, setLostPasswordSubmitErrors ] = useState<{ [ key: string ]: string }>( {} );
  const selectedLostPassValues = useTypedSelector( state => state.lostPassReducer ).lostPassValues;
  const [ isValueChanged, setIsValueChanged ] = useState<boolean>( false );
  const lostPassResponse = useTypedSelector( state => state.lostPassPostDataReducer );
  return (
    <Form classnames={['bg-white', 'w-1/2', 'md:mr-4', 'mb-4', 'md:mb-0', 'rounded', 'shadow-md', 'relative', 'p-4']} id='lost-password-form' validation={LostPasswordValidation} submitErrors={lostPasswordSubmitErrors} setSubmitErrors={setLostPasswordSubmitErrors} selectedValues={selectedLostPassValues} isValueChanged={isValueChanged} setIsValueChanged={setIsValueChanged} responseData={lostPassResponse}>
      <h1 className='mb-2 text-xl'>
        Lost your password? Please enter your username or email address. You will receive a link to create a new password via email.
      </h1>
      <TextField actionType={ FormActionsEnum.SET_LOST_PASS_VALUES } errors={ lostPasswordSubmitErrors } name='user_login' placeholder='Enter your username/email' type='text' setIsValueChanged={setIsValueChanged}/>
      <Button classnames={ [ 'btn', 'btn--primary', 'mb-2' ] } type="submit">Reset password</Button>
    </Form>
  );
};

export default LostPassword;
