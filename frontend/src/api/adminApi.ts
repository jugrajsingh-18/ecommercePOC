import axiosClient from './axiosClient';
import type {
  AdminQueryUserParams,
  AdminQueryOrderSummaryParams,
  PaginatedUsersResponse,
  OrderSummaryResponse,
  ProductSummaryResponse,
  AdminOrder,
} from '../types/adminTypes';
import type { CategoryProduct } from '../types/categoryTypes';

export const getUsers = async (
  params: AdminQueryUserParams
): Promise<PaginatedUsersResponse> => {
  const response = await axiosClient.get('/users/users', { params });
  return response.data;
};

export const getOrdersSummary = async (
  params?: AdminQueryOrderSummaryParams
): Promise<OrderSummaryResponse> => {
  const response = await axiosClient.get('/users/orders/summary', { params });
  return response.data;
};

export const getAllOrders = async (
  params?: AdminQueryOrderSummaryParams
): Promise<AdminOrder[]> => {
  const response = await axiosClient.get('/users/orders', { params });
  return response.data;
};

export const getProductsSummary =
  async (): Promise<ProductSummaryResponse> => {
    const response = await axiosClient.get('/users/products/summary');
    return response.data;
  };

export const updateOrderStatus = async (
  orderId: number,
  status: string
): Promise<unknown> => {
  const response = await axiosClient.patch(`/orders/${orderId}/status`, {
    status,
  });
  return response.data;
};

export const addProduct = async (data: Omit<CategoryProduct, 'id' | 'creationAt' | 'updatedAt' | 'category'> & { categoryId?: number }) => {
  const response = await axiosClient.post('/product/add-product', data);
  return response.data;
};

export const addCategory = async (data: { name: string; image?: string }) => {
  const response = await axiosClient.post('/category', data);
  return response.data;
};

export const getCategories = async () => {
  const response = await axiosClient.get('/category');
  return response.data;
};

export const updateCategoryApi = async (id: number, data: { name?: string; image?: string }) => {
  const response = await axiosClient.patch(`/category/${id}`, data);
  return response.data;
};

export const deleteCategoryApi = async (id: number) => {
  const response = await axiosClient.delete(`/category/${id}`);
  return response.data;
};

export const getAdminProducts = async (categoryId?: number, search?: string): Promise<CategoryProduct[]> => {
  const params: any = {};
  if (categoryId) params.categoryId = categoryId;
  if (search) params.search = search;
  const response = await axiosClient.get('/product', { params });
  return response.data;
};

export const updateProductApi = async (id: number, data: Partial<CategoryProduct>) => {
  const response = await axiosClient.patch(`/product/${id}`, data);
  return response.data;
};

export const deleteProductApi = async (id: number) => {
  const response = await axiosClient.delete(`/product/${id}`);
  return response.data;
};
