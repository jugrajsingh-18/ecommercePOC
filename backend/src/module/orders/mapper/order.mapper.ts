import { Injectable } from '@nestjs/common';
import { Order } from '../infrastructure/entity/order.entity';
import { OrderItem } from '../infrastructure/entity/orderItem.entity';
import { OrderDomain, OrderItemDomain } from '../domain/order.doamin';
import { OrderResponseDto } from '../dto/orderStatusUpdate.dto';
import { UserEntity } from '../../user/infrastructure/entity/user.entity';
import { Product } from '../../product/infrastructure/product/entity/product.entity';


@Injectable()
export class OrderMapper {
  
  public static toDomain(entity: Order): OrderDomain {
    if (!entity) return null;

    const userId = entity.user?.id || (entity as Order & { userId?: string }).userId;
    
    const itemsDomain = entity.items?.map(item => new OrderItemDomain(
      item.id,
      item.product?.id || (item as OrderItem & { productId?: number }).productId,
      item.quantity,
      item.price,
      item.product?.title,
      item.product?.images?.[0]
    )) || [];

    return new OrderDomain(
      entity.id,
      userId,
      itemsDomain,
      Number(entity.totalAmount),
      entity.status,
      entity.createdAt,
      entity.updatedAt
    );
  }

  public static toEntity(domain: OrderDomain): Order {
    const entity = new Order();
    if (domain.id) entity.id = domain.id;
    
    entity.user = { id: domain.userId } as unknown as UserEntity;
    entity.totalAmount = domain.totalAmount;
    entity.status = domain.status;
    if (domain.createdAt) entity.createdAt = domain.createdAt;
    if (domain.updatedAt) entity.updatedAt = domain.updatedAt;

    if (domain.items && domain.items.length > 0) {
      entity.items = domain.items.map(itemDomain => {
        const itemEntity = new OrderItem();
        if (itemDomain.id) itemEntity.id = itemDomain.id;
        itemEntity.product = { id: itemDomain.productId } as unknown as Product;
        itemEntity.quantity = itemDomain.quantity;
        itemEntity.price = itemDomain.price;
        return itemEntity;
      });
    }

    return entity;
  }

  public static toResponseDto(domain: OrderDomain): OrderResponseDto {
    if (!domain) return null;
    return {
      id: domain.id,
      userId: domain.userId,
      totalAmount: domain.totalAmount,
      status: domain.status,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      items: domain.items.map(item => ({
        id: item.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        productTitle: item.productTitle,
        productImage: item.productImage,
      })),
    };
  }
}