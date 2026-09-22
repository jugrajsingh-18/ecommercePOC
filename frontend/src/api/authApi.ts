import axiosClient from './axiosClient';

export const registerUser = async (data: {
  username: string;
  email: string;
  password: string;
  role?: string;
}) => {
  const response = await axiosClient.post('/auth/register', data);
  return response.data;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const response = await axiosClient.post('/auth/login', data);
  return response.data;
};

export const getMe = async () => {
  const response = await axiosClient.get('/auth/me');
  return response.data;
};

export const refreshToken = async () => {
  const response = await axiosClient.post('/auth/refresh');
  return response.data;
};

export const logoutUser = async () => {
  const response = await axiosClient.post('/auth/logout');
  return response.data;
};
