import axios from "axios";
import { BASE_URL } from "../../shared/config";
import * as constants from "../constants";

const failedUsers = (message) => ({
    type: constants.FAILED_USERS,
    payload: message
});

const loadingUsers = () => ({
    type: constants.LOADING_USERS
});

export const fetchUsers = () => async (dispatch) => {
    try {
        dispatch(loadingUsers());
        
        const response = await axios.get(
            `${BASE_URL}/api/user/users`,
        );

        if (response.status !== 200) {
            dispatch(failedUsers(response.data));
            return;
        }

        else {
            dispatch({
                type: constants.FETCH_USERS,
                payload: response.data.data,
            });
        }
    }
    catch (e) {
        dispatch(failedUsers(e.message));
    }
}