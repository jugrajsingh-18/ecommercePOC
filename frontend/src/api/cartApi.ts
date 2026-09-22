import axiosClient from "./axiosClient";

export const getCart = async () => {
    const response = await axiosClient.get('/cartItem');
    return response.data;
};

export const addToCartApi = async (data: any) => {
    const response = await axiosClient.post('/cartItem', data);
    return response.data;
};

export const updateCartItemQuantity = async (cartItemId: number, quantity: number) => {
    const response = await axiosClient.patch(`/cartItem/${cartItemId}`, { quantity });
    return response.data;
};

export const removeCartItem = async (cartItemId: number) => {
    const response = await axiosClient.delete(`/cartItem/${cartItemId}`);
    return response.data;
};

export const clearCartApi = async () => {
    const response = await axiosClient.delete('/cartItem');
    return response.data;
};
