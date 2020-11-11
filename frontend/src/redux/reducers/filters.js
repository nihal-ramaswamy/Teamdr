import * as constants from '../constants';

export default (state = {

    isLoading: true,
    err: null,

}, action) => {

    switch (action.type) {

        case constants.LOADING_FILTERED_POSTS:
            return {...state, isLoading: true, err: null};
        case constants.FAILED_FILTERED_POSTS:
            return {...state, isLoading: false, err: action.payload};
            
        default: 
            return state;       

    }
}

