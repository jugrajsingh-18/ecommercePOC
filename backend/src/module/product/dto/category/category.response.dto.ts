import { ApiProperty } from '@nestjs/swagger';

export class CategoryResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({
    required: false,
    nullable: true,
  })
  image?: string | null;

  @ApiProperty()
  creationAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
