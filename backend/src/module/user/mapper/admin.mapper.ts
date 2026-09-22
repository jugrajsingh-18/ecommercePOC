import { Injectable } from '@nestjs/common';
import { UserEntity } from '../infrastructure/entity/user.entity';
import { UserDomain, PaginatedUsersDomain } from '../domain/admin.domain';
import { PaginatedUserResponseDto, UserResponseDto } from '../dto/adminPagination.dto';

@Injectable()
export class AdminMapper {
  
  public static toUserDomain(entity: UserEntity): UserDomain {
    return new UserDomain(
      entity.id,
      entity.username,
      entity.email,
      entity.role,
      entity.createdAt,
    );
  }

  public static toUserResponseDto(domain: UserDomain): UserResponseDto {
    return {
      id: domain.id,
      username: domain.username,
      email: domain.email,
      role: domain.role,
      createdAt: domain.createdAt,
    };
  }

  public static toPaginatedUserResponseDto(domain: PaginatedUsersDomain): PaginatedUserResponseDto {
    return {
      data: domain.data.map((user) => this.toUserResponseDto(user)),
      meta: domain.meta,
    };
  }
}