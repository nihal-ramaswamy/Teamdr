import * as constants from "../constants";

export default (
    state = {
        isLoading: true,
        err: null,
        listOfUsers: [],
    },
    action
) => {
    switch (action.type) {
        case constants.LOADING_USERS:
            return { ...state, isLoading: true, err: null };
        case constants.FAILED_USERS:
            return { ...state, isLoading: false, err: action.payload };

        case constants.FETCH_USERS:
            return {
                ...state,
                isLoading: false,
                err: null,
                listOfUsers: action.payload,
            };

        default:
            return state;
    }
};
