import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Electronics',
    description: 'Category name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'https://i.imgur.com/QkIa5tT.jpeg',
    description: 'Category image URL',
  })
  @IsString()
  @IsUrl()
  @IsOptional()
  image: string;
}
