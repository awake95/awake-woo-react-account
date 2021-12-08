import {combineReducers, applyMiddleware, createStore} from "redux";
import reducers from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from "redux-thunk";

const rootReducer = combineReducers(reducers);

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
