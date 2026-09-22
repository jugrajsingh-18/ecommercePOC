import axiosClient from "./axiosClient";

interface Props{
    id: string | undefined;
}

export const GetSpecificCategoryProduct = async ({ id }: Props) => {
    const response = await axiosClient.get(`/product?categoryId=${id}`);
    return response;
}