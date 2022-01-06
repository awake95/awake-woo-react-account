import authReducer from './authReducer'
import loginReducer from './formReducers/loginReducer';
import registerReducer from './formReducers/registerReducer';
import loginPostDataReducer from './formReducers/loginPostDataReducer';
import registerPostDataReducer from './formReducers/registerPostDataReducer';
import lostPassReducer from './formReducers/lostPassReducer';
import lostPassPostDataReducer from './formReducers/lostPassPostDataReducer';
import noticeReducer from './noticeReducer';

export default {
    authReducer,
    noticeReducer,
    loginReducer,
    loginPostDataReducer,
    registerPostDataReducer,
    registerReducer,
    lostPassReducer,
    lostPassPostDataReducer,
}

