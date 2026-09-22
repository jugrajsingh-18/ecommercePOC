import axiosClient from "./axiosClient";
import type { CategoryProduct } from "../types/categoryTypes";
import type { AxiosResponse } from "axios";

export const getProducts = async (search?: string): Promise<AxiosResponse<CategoryProduct[]>> => {
    const url = search ? `/product?search=${encodeURIComponent(search)}` : '/product';
    const res = await axiosClient.get<CategoryProduct[]>(url);
    return res;
}

export const getSpecificProduct = async (id: string): Promise<AxiosResponse<CategoryProduct>> => {
    const res = await axiosClient.get<CategoryProduct>(`/product/${id}`);
    return res;
}

export  const defaultImage = "/images/default-product.jpg"

export const invalidImages = ['https://placeimg.dev/1200x628/597aa2', 'https://placeimg.dev/400x300/ce2da6', 'https://placeimg.dev/400x300/597aa2', 'https://placehold.co/600x400']

export const checkInvalidImageOrNot = (url: string) => {
    const index = invalidImages.includes(url)
    return index;
}