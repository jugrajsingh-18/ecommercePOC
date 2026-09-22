import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order, OrderStatus } from "../entity/order.entity";
import { Repository } from "typeorm";
import { OrderItem } from "../entity/orderItem.entity";

@Injectable()
export class orderRepository {
    constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>
    ){}
    async create(user, totalAmount) {
        return this.orderRepository.create({
            user: user,
            totalAmount,
            status: OrderStatus.PENDING,
        })
    }

    async save(order){
            return this.orderRepository.save(order);

    }

    async getOrders(userId: string) {
        return this.orderRepository.find({
            where: { user: { id: userId } },
            relations: { items: { product: true } },
            order: { createdAt: 'DESC' },
        });
    }

    async getOrder(userId: string, orderId: number) {
        return await this.orderRepository.findOne({
            where: { id: orderId, user: { id: userId } },
            relations: { items: { product: true } },
        });
    }

    async OrderItemSave(orderItems: OrderItem[]) {
        this.orderItemRepository.save(orderItems)
    }

    async findOne(orderId) {
        return await this.orderRepository.findOne({
            where: { id: orderId },
            relations: { user: true },
        });

    }
}