import { OrderStatus } from '../infrastructure/entity/order.entity';

export class OrderItemDomain {
  constructor(
    public id: number | null,
    public productId: number,
    public quantity: number,
    public price: number,
    public productTitle?: string,
    public productImage?: string,
  ) {}
}

export class OrderDomain {
  constructor(
    public id: number | null,
    public userId: string, 
    public items: OrderItemDomain[],
    public totalAmount: number,
    public status: OrderStatus,
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}

  calculateTotal(): void {
    this.totalAmount = this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
  }

  changeStatus(newStatus: OrderStatus): void {
    this.status = newStatus;
  }

  markAsPaid(): void {
    if (this.status !== OrderStatus.PENDING) {
      throw new Error('Payment can only be made for pending orders');
    }
    this.status = OrderStatus.PAID;
  }
}