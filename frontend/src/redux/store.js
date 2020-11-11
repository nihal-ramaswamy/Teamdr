import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import userReducer from './reducers/user';
import usersReducer from './reducers/users';

export const configureStore = () => {
    const store =  createStore(combineReducers({
        user: userReducer,
        users: usersReducer,
    }), applyMiddleware(thunk, logger));
    return store;
}