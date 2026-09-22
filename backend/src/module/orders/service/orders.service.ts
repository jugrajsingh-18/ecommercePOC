import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Order, OrderStatus } from '../infrastructure/entity/order.entity';
import { OrderItem } from '../infrastructure/entity/orderItem.entity';
import { orderRepository } from '../infrastructure/repository/order.repository';
import { DataSource } from 'typeorm';
import { CartItem } from '../../cart-item/infrastructure/entity/cartItem.entity';
import {
  NOTIFICATION_EVENTS,
  OrderPlacedEvent,
  OrderUpdatedEvent,
} from '../../../events/notification.events';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserEntity } from '../../user/infrastructure/entity/user.entity';
import { OrderDomain, OrderItemDomain } from '../domain/order.doamin';
import { OrderMapper } from '../mapper/order.mapper';
import { OrderResponseDto } from '../dto/orderStatusUpdate.dto';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: orderRepository,
    private readonly dataSource: DataSource,
    private eventEmitter: EventEmitter2,
  ) { }

  async createOrder(userId: string, user: UserEntity) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const cartItems = await queryRunner.manager.find(CartItem, {
        where: {
          user: { id: userId },
        },
        relations: {
          user: true,
          product: true,
        },
      });

      if (!cartItems.length) {
        throw new BadRequestException('Cart is empty');
      }

      for (const item of cartItems) {
        if (item.product.availableQuantity < item.quantity) {
          throw new BadRequestException(`Insufficient quantity available for ${item.product.title}. Only ${item.product.availableQuantity} left in stock.`);
        }
        item.product.availableQuantity -= item.quantity;
      }

      const orderItemsDomain = cartItems.map(
        (item) =>
          new OrderItemDomain(
            null,
            item.product.id,
            item.quantity,
            item.product.price,
          ),
      );

      const orderDomain = new OrderDomain(
        null,
        userId,
        orderItemsDomain,
        0,
        OrderStatus.PENDING,
      );

      orderDomain.calculateTotal();

      const order = queryRunner.manager.create(Order, {
        user: cartItems[0].user,
        totalAmount: orderDomain.totalAmount,
        status: OrderStatus.PENDING,
      });

      const savedOrder = await queryRunner.manager.save(order);

      const orderItems = cartItems.map((item) =>
        queryRunner.manager.create(OrderItem, {
          order: savedOrder,
          product: item.product,
          quantity: item.quantity,
          price: item.product.price,
        }),
      );

      await queryRunner.manager.save(OrderItem, orderItems);

      // Save updated product quantities
      await queryRunner.manager.save(cartItems.map(item => item.product));

      await queryRunner.manager.remove(CartItem, cartItems);

      await queryRunner.commitTransaction();
      orderDomain.id = savedOrder.id;
      const event = new OrderPlacedEvent();
      event.userId = user.id;
      event.orderId = order.id;
      event.orderTotal = order.totalAmount;
      event.userEmail = user.email;
      event.userName = user.username;

      this.eventEmitter.emit(NOTIFICATION_EVENTS.ORDER_PLACED, event);
      return OrderMapper.toResponseDto(orderDomain);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getOrders(userId: string): Promise<OrderResponseDto[]> {
    const orders = await this.orderRepository.getOrders(userId);
    return orders.map((order) =>
      OrderMapper.toResponseDto(OrderMapper.toDomain(order)),
    );
  }

  async getOrder(userId: string, orderId: number) {
    const order = await this.orderRepository.getOrder(userId, orderId);

    if (!order) throw new NotFoundException('Order not found');

    return OrderMapper.toResponseDto(OrderMapper.toDomain(order));
  }

  async updateStatus(orderId: number, status: OrderStatus) {
    const order = await this.orderRepository.findOne(orderId);

    if (!order) throw new NotFoundException('Order not found');
    const domain = OrderMapper.toDomain(order);
    domain.changeStatus(status);
    const savedEntity = await this.orderRepository.save(
      OrderMapper.toEntity(domain),
    );

    const event = new OrderUpdatedEvent();
    event.userId = order.user.id;
    event.orderId = order.id;
    event.status = status;
    event.userEmail = order.user.email;
    event.userName = order.user.username;
    this.eventEmitter.emit(NOTIFICATION_EVENTS.ORDER_UPDATED, event);

    return OrderMapper.toResponseDto(OrderMapper.toDomain(savedEntity));
  }

  async simulatePayment(orderId: number) {
    const order = await this.orderRepository.findOne(orderId);

    if (!order) throw new NotFoundException('Order not found');
    const domain = OrderMapper.toDomain(order);
    if (domain.status !== OrderStatus.PENDING) {
      throw new BadRequestException(
        'Payment can only be made for pending orders',
      );
    }

    if (Math.random() <= 0.3) {
      throw new BadRequestException('Payment failed');
    }

    domain.status = OrderStatus.PAID;
    const savedEntity = await this.orderRepository.save(domain);

    const event = new OrderUpdatedEvent();
    event.userId = order.user.id;
    event.orderId = order.id;
    event.status = OrderStatus.PAID;
    event.userEmail = order.user.email;
    event.userName = order.user.username;
    this.eventEmitter.emit(NOTIFICATION_EVENTS.ORDER_UPDATED, event);

    return { message: 'Payment successful', order: OrderMapper.toResponseDto(OrderMapper.toDomain(savedEntity)) };
  }
}
