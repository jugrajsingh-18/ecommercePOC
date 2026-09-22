import { ApiProperty } from '@nestjs/swagger';

export class ProductResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty({
    type: [String],
  })
  images?: string[];

  @ApiProperty({
    required: false,
    nullable: true,
  })
  categoryId?: number | null;

  @ApiProperty({
    required: false,
    nullable: true,
  })
  category?: { id: number; name: string; image?: string } | null;

  @ApiProperty()
  creationAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  availableQuantity?: number;
}
