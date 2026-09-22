import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class SimulatePaymentDto {
  @ApiProperty({
    example: 3,
  })
  @IsInt()
  orderId: number;
}