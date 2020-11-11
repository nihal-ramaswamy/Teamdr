import { BASE_URL } from "../shared/config";
import axios from "axios";
import getConfig from './getConfig';

export const uploadFile = async (file) => {
    let form = new FormData();
    form.append("file", file, file.name);

    const response = await axios.post(
        `${BASE_URL}/api/graphical`,
        form,
        getConfig()
    );
  
    return response.data.data;
};

export const deleteImage = async (file) => {

    const response = await axios.delete(
        `${BASE_URL}/api/graphical/${file._id}`,
        getConfig()
    );

    return response.data.data;

};

export const updateImage = async (file, changes) => {

    const response = await axios.put(
        `${BASE_URL}/api/graphical/${file._id}`,
        changes,
        getConfig()
    );

    return response.data.data;

};