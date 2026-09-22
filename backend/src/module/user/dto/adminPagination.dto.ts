import { IsOptional, IsString, IsInt, Min, Max, IsEnum, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '../infrastructure/entity/user.entity';


export class AdminQueryUserDto {
  @ApiPropertyOptional({ description: 'Page number for pagination', minimum: 1, default: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Number of items per page', minimum: 1, maximum: 100, default: 10 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  limit?: number = 10;

  @ApiPropertyOptional({ description: 'Search by username or email' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ description: 'Field to sort by', default: 'createdAt' })
  @IsOptional()
  @IsString()
  sortBy?: string = 'createdAt';

  @ApiPropertyOptional({ description: 'Sort order', enum: ['ASC', 'DESC'], default: 'DESC' })
  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  order?: 'ASC' | 'DESC' = 'DESC';
}

export class AdminQueryOrderSummaryDto {
  @ApiPropertyOptional({ description: 'Filter orders from this date (ISO string)', example: '2023-01-01T00:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({ description: 'Filter orders up to this date (ISO string)', example: '2023-12-31T23:59:59.000Z' })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}


export class PaginationMetaDto {
  @ApiProperty({ example: 50 }) total: number;
  @ApiProperty({ example: 1 }) page: number;
  @ApiProperty({ example: 10 }) limit: number;
  @ApiProperty({ example: 5 }) totalPages: number;
  @ApiProperty({ example: true }) hasNextPage: boolean;
  @ApiProperty({ example: false }) hasPrevPage: boolean;
}

export class UserResponseDto {
  @ApiProperty({ example: 'uuid-1234' }) id: string;
  @ApiProperty({ example: 'johndoe' }) username: string;
  @ApiProperty({ example: 'john@example.com' }) email: string;
  @ApiProperty({ enum: Role, example: Role.USER }) role: Role;
  @ApiProperty() createdAt: Date;
}

export class PaginatedUserResponseDto {
  @ApiProperty({ type: [UserResponseDto] }) data: UserResponseDto[];
  @ApiProperty({ type: PaginationMetaDto }) meta: PaginationMetaDto;
}

export class OrderStatusCountDto {
  @ApiProperty({ example: 'Delivered' }) status: string;
  @ApiProperty({ example: 42 }) count: number;
}

export class OrderSummaryResponseDto {
  @ApiProperty({ example: 150 }) totalOrders: number;
  @ApiProperty({ example: 12500.50 }) revenue: number;
  @ApiProperty({ type: [OrderStatusCountDto] }) byStatus: OrderStatusCountDto[];
}

export class MostOrderedProductDto {
  @ApiProperty({ example: 1 }) id: number;
  @ApiProperty({ example: 'Wireless Mouse' }) title: string;
  @ApiProperty({ example: 350 }) totalSold: number;
}

export class ProductSummaryResponseDto {
  @ApiProperty({ example: 200 }) totalProducts: number;
  @ApiProperty({ example: 5 }) outOfStockCount: number;
  @ApiProperty({ type: [MostOrderedProductDto] }) mostOrdered: MostOrderedProductDto[];
}