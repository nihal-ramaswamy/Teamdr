import { BASE_URL } from "../shared/config";
import axios from "axios";
import getConfig from './getConfig';

export const getTagIDs = async (tags) => {
    const response = await axios.post(
        `${BASE_URL}/api/tag`,
        tags,
        getConfig()
    );
    return response.data.data;
}

export const getAllTags = async () => {
    const response = await axios.get(
        `${BASE_URL}/api/tag`,
        getConfig()
    );
    return response.data.data;
}