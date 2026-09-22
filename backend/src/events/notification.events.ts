export const NOTIFICATION_EVENTS = {
  ORDER_PLACED: 'notification.order.placed',
  ORDER_UPDATED: 'notification.order.updated',
};

export class OrderPlacedEvent {
  userId: string;
  orderId: number;
  orderTotal: number;
  userEmail: string;
  userName: string;
}

export class OrderUpdatedEvent {
  userId: string;
  orderId: number;
  status: string;
  userEmail: string;
  userName: string;
}