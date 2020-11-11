import * as constants from '../constants';

export default (state = {

    isLoading: true,
    err: null,
    isAuthenticated: false,
    data: null,
    jwt: null,

}, action) => {

    switch (action.type) {

        case constants.LOADING_USER:
            return {...state, isLoading: true, err: ""};
        case constants.FAILED_USER:
            return {...state, isLoading: false, err: action.payload};        

        case constants.AUTHENTICATE_USER:
            return {...state, isLoading: false, isAuthenticated: true , data: action.payload, jwt: localStorage.getItem('jwt'), err: ""};

        case constants.LOGIN_USER:
            localStorage.setItem('jwt', action.payload);
            return {...state, isLoading: false, isAuthenticated: false , data: null, err: ""};
        case constants.REGISTER_USER:
            return {...state, isLoading: false, isAuthenticated: true , data: null, err: ""};
        case constants.LOGOUT_USER:
            localStorage.setItem('jwt', null);
            return {...state, isLoading: true, isAuthenticated: false , data: null, err: ""};
        
        default:
            return state;

    }
}