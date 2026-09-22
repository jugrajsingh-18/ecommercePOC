import axiosClient from "./axiosClient";

export const fetchCategory = async () => {
    const response = await axiosClient.get('/category');
    return response;
};
