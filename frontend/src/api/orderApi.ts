import axiosClient from "./axiosClient";

export const checkout = async () => {
  const response = await axiosClient.post('/orders');
  return response.data;
};

export const getUserOrders = async () => {
  const response = await axiosClient.get('/orders');
  return response.data;
};
