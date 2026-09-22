import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { OrderStatus } from '../infrastructure/entity/order.entity';

export class orderStatusUpdateDto {
  @ApiProperty({
    example: 'Shipped',
  })
  @IsString()
  status: OrderStatus;
}
export class OrderItemResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 101 })
  productId: number;

  @ApiProperty({ example: 2 })
  quantity: number;

  @ApiProperty({ example: 49.99 })
  price: number;

  @ApiProperty({ example: 'Vintage T-Shirt', required: false })
  productTitle?: string;

  @ApiProperty({ example: 'https://example.com/image.jpg', required: false })
  productImage?: string;
}

export class OrderResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'user-123' })
  userId: string;

  @ApiProperty({ type: [OrderItemResponseDto] })
  items: OrderItemResponseDto[];

  @ApiProperty({ example: 99.98 })
  totalAmount: number;

  @ApiProperty({ example: 'Pending', enum: OrderStatus })
  status: OrderStatus;

  @ApiProperty({ example: '2026-07-02T10:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2026-07-02T10:00:00.000Z' })
  updatedAt: Date;
}