import { CategoryDomain } from '../domain/category.domain';
import { CreateCategoryDto } from '../dto/category/category.dto';
import { CategoryResponseDto } from '../dto/category/category.response.dto';
import { Category } from '../infrastructure/category/entity/category.entity';

export class CategoryMapper {
  static fromDto(dto: CreateCategoryDto): CategoryDomain {
    return new CategoryDomain({
      ...dto,
    });
  }

  static toEntity(domain: CategoryDomain): Category {
    const entity = new Category();

    entity.id = domain.id;
    entity.name = domain.name;
    entity.image = domain.image;
    entity.creationAt = domain.creationAt;
    entity.updatedAt = domain.updatedAt;

    return entity;
  }

  static fromEntity(entity: Category): CategoryDomain {
    return new CategoryDomain({
      id: entity.id,
      name: entity.name,
      image: entity.image,
      creationAt: entity.creationAt,
      updatedAt: entity.updatedAt,
    });
  }

  static toResponse(domain: CategoryDomain): CategoryResponseDto {
    return {
      id: domain.id!,
      name: domain.name,
      image: domain.image,
      creationAt: domain.creationAt!,
      updatedAt: domain.updatedAt!,
    };
  }
}
