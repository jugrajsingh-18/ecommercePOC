import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../domain/user.domain';

export class UserResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username?: string;

  @ApiProperty()
  email: string;

  @ApiProperty({
    enum: Role,
  })
  role: Role;

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}