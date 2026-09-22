import axiosClient from "./axiosClient";

export interface Notification {
  id: number;
  userId: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

export const notificationApi = {
  getNotifications: async () => {
    const response = await axiosClient.get<Notification[]>("/notifications");
    return response.data;
  },

  getUnreadNotifications: async () => {
    const response = await axiosClient.get<Notification[]>("/notifications/unread");
    return response.data;
  },

  markAsRead: async (id: number) => {
    const response = await axiosClient.patch(`/notifications/${id}/read`);
    return response.data;
  },

  markAllAsRead: async () => {
    const response = await axiosClient.patch("/notifications/read-all");
    return response.data;
  },

  deleteNotification: async (id: number) => {
    const response = await axiosClient.delete(`/notifications/${id}`);
    return response.data;
  },
};
