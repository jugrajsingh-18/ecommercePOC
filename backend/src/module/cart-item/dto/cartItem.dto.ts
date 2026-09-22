import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class CreateCartItemDto {
  @ApiProperty({
    example: 1,
    description: 'ID of the product to add to the cart',
  })
  @IsInt()
  productId: number;

  @ApiProperty({
    example: 2,
    description: 'Quantity of the product',
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  quantity: number;
}

export class UpdateCartItemDto {
  @ApiProperty({
    example: 3,
    description: 'Updated quantity of the cart item',
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  quantity: number;
}

export class CartItemResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'user-123' })
  userId: string;

  @ApiProperty({ example: 5 })
  productId: number;

  @ApiProperty({ example: 2 })
  quantity: number;

  @ApiProperty({ required: false })
  productDetails?: Record<string, unknown>;

  @ApiProperty({ example: '2026-07-02T10:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2026-07-02T10:00:00.000Z' })
  updatedAt: Date;
}
