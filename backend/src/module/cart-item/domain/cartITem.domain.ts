import { ProductResponseDto } from '../../product/dto/product/product.response.dto';

export class CartItemDomain {
  constructor(
    public id: number | null,
    public userId: string,
    public productId: number,
    public quantity: number,
    public createdAt?: Date,
    public updatedAt?: Date,
    public productDetails?: ProductResponseDto,
  ) { }
}