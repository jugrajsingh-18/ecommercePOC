import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Gaming Laptop',
    description: 'Product title',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'gaming-laptop',
    description: 'Unique product slug',
  })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({
    example: 'High performance gaming laptop',
    description: 'Product description',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 12000,
    description: 'Product price',
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  price: number;

  @ApiProperty({
    type: [String],
    example: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAkVoECNDCPh2-d0rDWugZYCGHSWJTjq6xkQ&s',
    ],
    description: 'List of product image URLs',
  })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @IsUrl({}, { each: true })
  images: string[];


  @ApiProperty({
    example: 1,
    description: 'Category ID',
  })
  @IsOptional()
  @IsInt()
  categoryId: number;

  @ApiProperty({
    example: 50,
    description: 'Available quantity in stock',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  availableQuantity?: number;
}