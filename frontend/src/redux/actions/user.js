import axios from "axios";
import getConfig from "../../helpers/getConfig";
import { BASE_URL } from "../../shared/config";
import * as constants from "../constants";

export const loginUser = ({ username, password }) => async (dispatch) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/api/auth/login`,
            { username: username, password: password },
            getConfig()
        );

        if (response.status !== 200) {
            
            dispatch(failedUser(response.data));
            return;
        } else {
            dispatch({
                type: constants.LOGIN_USER,
                payload: response.data.token,
            });

            authenticateUser()(dispatch);
        }

        return true;
    } catch (e) {
        dispatch(failedUser({message: "Incorrect username or password"}));
    }
};

export const registerUser = ({
    username,
    password,
    email,
    isClient,
    name,
    preferences
}) => async (dispatch) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/api/auth/register`,
            {
                username: username,
                password: password,
                email: email,
                isClient: isClient,
                name: name,
                preferences: preferences,
            },
            getConfig()
        );

        if (response.status !== 200) {
            dispatch(failedUser(response.data));
            return;
        } else {
            dispatch({
                type: constants.REGISTER_USER,
                payload: response.data.data,
            });

            loginUser({ username: username, password: password })(dispatch);
        }
    } catch (e) {
        dispatch(failedUser(e));
    }
};

export const logoutUser = () => async(dispatch) => {
    try {
        dispatch({
            type: constants.LOGOUT_USER,
            payload:null,
        });
        localStorage.clear();
        window.location.reload();
    }
    catch (error) {
        console.log('Could not log out.')
        console.log(error)
    }
}

export const authenticateUser = () => async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/user/`, getConfig());

        if (response.status !== 200) {
            dispatch(failedUser(response.data.data));
            return;
        } else {
            dispatch({
                type: constants.AUTHENTICATE_USER,
                payload: response.data.data,
            });
        }
    } catch (e) {
        dispatch(failedUser({ message: e.message }));
    }
};

export const updateUserSettings = (updatedChanges) => async (dispatch) => {
    try {
        const response = await axios.put(
            `${BASE_URL}/api/user/`,
            updatedChanges,
            getConfig()
        );

        if (response.status !== 200) {
            dispatch(failedUser(response.data.data));
            return;
        } else {
            authenticateUser()(dispatch);
        }
    } catch (e) {
        dispatch(failedUser(e));
    }
};

export const loadingUser = () => ({
    type: constants.LOADING_USER,
});

export const failedUser = (err) => ({
    type: constants.FAILED_USER,
    payload: err.message,
});
