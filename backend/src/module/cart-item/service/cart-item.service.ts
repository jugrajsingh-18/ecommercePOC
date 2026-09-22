import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCartItemDto, UpdateCartItemDto } from '../dto/cartItem.dto';
import { CartItemRepository } from '../infrastructure/repository/cartItem.repository';
import { ProductRepository } from '../../product/infrastructure/product/repository/product.repository';
import { CartItemMapper } from '../mapper/cartItem.mapper';

@Injectable()
export class CartItemService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly cartRepository: CartItemRepository,
  ) {}

  async addToCart(userId: string, dto: CreateCartItemDto) {
    const product = await this.productRepository.findOne(dto.productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (
      product.availableQuantity !== undefined &&
      product.availableQuantity <= 0
    ) {
      throw new BadRequestException('Product is out of stock');
    }

    const existingItem = await this.cartRepository.findOne(
      dto.productId,
      userId,
    );

    if (existingItem) {
      if (
        product.availableQuantity !== undefined &&
        existingItem.quantity + dto.quantity > product.availableQuantity
      ) {
        throw new BadRequestException(
          `Cannot add more. Only ${product.availableQuantity} in stock (${existingItem.quantity} already in cart).`,
        );
      }
      existingItem.quantity += dto.quantity;
      return this.cartRepository.save(existingItem);
    }

    if (
      product.availableQuantity !== undefined &&
      dto.quantity > product.availableQuantity
    ) {
      throw new BadRequestException(
        `Cannot add more than available stock (${product.availableQuantity}).`,
      );
    }

    const cartItem = await this.cartRepository.create(
      dto.quantity,
      userId,
      product,
    );

    return this.cartRepository.save(cartItem);
  }

  async getCart(userId: string) {
    return this.cartRepository.find(userId);
  }

  async updateQuantity(
    userId: string,
    cartItemId: number,
    dto: UpdateCartItemDto,
  ) {
    const cartItem = await this.cartRepository.findOneCartItem(
      cartItemId,
      userId,
    );

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    if (
      cartItem.product?.availableQuantity !== undefined &&
      dto.quantity > cartItem.product.availableQuantity
    ) {
      throw new BadRequestException(
        `Requested quantity exceeds available stock (${cartItem.product.availableQuantity}).`,
      );
    }

    const domain = CartItemMapper.toDomain(cartItem);
    domain.quantity = dto.quantity;

    const entity = await this.cartRepository.save(
      CartItemMapper.toEntity(domain),
    );
    return CartItemMapper.toResponseDto(CartItemMapper.toDomain(entity));
  }

  async removeItem(userId: string, cartItemId: number) {
    const cartItem = await this.cartRepository.findOneCartItem(
      cartItemId,
      userId,
    );

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    await this.cartRepository.remove(cartItem);

    return {
      message: 'Item removed from cart',
    };
  }

  async clearCart(userId: string) {
    await this.cartRepository.delete(userId);

    return {
      message: 'Cart cleared successfully',
    };
  }
}
