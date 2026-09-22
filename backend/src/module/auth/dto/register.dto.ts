import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export enum Role {
  ADMIN = 'Admin',
  USER = 'User',
}

export class RegisterDto {
  @ApiProperty({
    example: 'james_bond',
    description: 'Username of the user',
  })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'james@example.com',
    description: 'Email address',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    minLength: 6,
    description: 'Password (minimum 6 characters)',
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({
    enum: Role,
    enumName: 'Role',
    example: Role.USER,
    description: 'User role',
    default: Role.USER,
  })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}

export class LoginDto {
  @ApiProperty({
    example: 'james@example.com',
    description: 'Email address',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Password',
  })
  @IsString()
  password: string;
}