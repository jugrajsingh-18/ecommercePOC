import { Injectable } from '@nestjs/common';
import { CartItemResponseDto } from '../dto/cartItem.dto';
import { CartItem } from '../infrastructure/entity/cartItem.entity';
import { CartItemDomain } from '../domain/cartITem.domain';
import { UserEntity } from '../../user/infrastructure/entity/user.entity';
import { Product } from '../../product/infrastructure/product/entity/product.entity';

@Injectable()
export class CartItemMapper {

  public static toDomain(entity: CartItem): CartItemDomain {
    if (!entity) return null;

    // TypeORM sometimes returns the raw join column ID if the relation isn't loaded
    const userId = entity.user?.id || (entity as CartItem & { user_id?: string }).user_id;
    const productId = entity.product?.id || (entity as CartItem & { product_id?: number }).product_id;

    return new CartItemDomain(
      entity.id,
      userId,
      productId,
      entity.quantity,
      entity.createdAt,
      entity.updatedAt,
      entity.product
    );
  }

  public static toEntity(domain: CartItemDomain): CartItem {
    const entity = new CartItem();

    if (domain.id) {
      entity.id = domain.id;
    }

    // Use type assertion to the actual entities to satisfy TypeORM relations
    entity.user = { id: domain.userId } as unknown as UserEntity;
    entity.product = { id: domain.productId } as unknown as Product;
    entity.quantity = domain.quantity;

    if (domain.createdAt) entity.createdAt = domain.createdAt;
    if (domain.updatedAt) entity.updatedAt = domain.updatedAt;

    return entity;
  }

  public static toResponseDto(domain: CartItemDomain): CartItemResponseDto {
    if (!domain) return null;
    return {
      id: domain.id,
      userId: domain.userId,
      productId: domain.productId,
      quantity: domain.quantity,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }
}