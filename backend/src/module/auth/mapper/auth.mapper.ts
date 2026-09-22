import { UserEntity } from "../../user/infrastructure/entity/user.entity";
import { UserDomain } from "../domain/user.domain";
import { RegisterDto, Role } from "../dto/register.dto";
import { UserResponseDto } from "../dto/userResponse.dto";

export class AuthMapper {
  static fromDto(dto: RegisterDto): UserDomain {
    return new UserDomain({
      ...dto,
      email:dto.email.toLowerCase(),
      role: dto.role ?? Role.USER,
    });
  }

  static toEntity(domain: UserDomain): UserEntity {
    const entity = new UserEntity();

    entity.id = domain.id;
    entity.username = domain.username;
    entity.email = domain.email;
    entity.password = domain.password;
    entity.role = domain.role;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    entity.deletedAt = domain.deletedAt;

    return entity;
  }

  static fromEntity(entity: UserEntity): UserDomain {
    return new UserDomain({
      id: entity.id,
      username: entity.username,
      email: entity.email,
      password: entity.password,
      role: entity.role,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    });
  }

  static toResponse(domain: UserDomain): UserResponseDto {
    return {
      id: domain.id!,
      username: domain.username,
      email: domain.email,
      role: domain.role,
      accessToken: domain.accessToken,
      refreshToken: domain.refreshToken,
      createdAt: domain.createdAt!,
      updatedAt: domain.updatedAt!,
    };
  }
}