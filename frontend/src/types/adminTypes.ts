export interface AdminQueryUserParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  order?: 'ASC' | 'DESC';
}

export interface AdminQueryOrderSummaryParams {
  startDate?: string;
  endDate?: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface PaginatedUsersResponse {
  data: AdminUser[];
  meta: PaginationMeta;
}

export interface OrderStatusCount {
  status: string;
  count: number;
}

export interface OrderSummaryResponse {
  totalOrders: number;
  revenue: number;
  byStatus: OrderStatusCount[];
}

export interface MostOrderedProduct {
  id: number;
  title: string;
  totalSold: number;
}

export interface ProductSummaryResponse {
  totalProducts: number;
  outOfStockCount: number;
  mostOrdered: MostOrderedProduct[];
}

export interface AdminOrderItem {
  id: number;
  quantity: number;
  price: number;
  product: {
    id: number;
    title: string;
    images: string[];
  };
}

export interface AdminOrder {
  id: number;
  totalAmount: number;
  status: string;
  createdAt: string;
  user: {
    id: string;
    email: string;
    username?: string;
  };
  items: AdminOrderItem[];
}
