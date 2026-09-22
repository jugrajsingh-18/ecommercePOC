import { ProductDomain } from '../domain/product.domain';
import { CreateProductDto } from '../dto/product/product.dto';
import { ProductResponseDto } from '../dto/product/product.response.dto';
import { Category } from '../infrastructure/category/entity/category.entity';
import { Product } from '../infrastructure/product/entity/product.entity';

export class ProductMapper {
  static fromDto(dto: CreateProductDto): ProductDomain {
    return new ProductDomain({
      ...dto,
    });
  }

  static toEntity(domain: ProductDomain): Product {
    const entity = new Product();
    entity.id = domain.id;
    entity.title = domain.title;
    entity.slug = domain.slug;
    entity.description = domain.description;
    entity.price = domain.price;
    entity.images = domain.images;
    if (domain.availableQuantity !== undefined) {
      entity.availableQuantity = domain.availableQuantity;
    }
    if (domain.categoryId) {
      entity.category = new Category();
      entity.category.id = domain.categoryId;
    }
    entity.creationAt = domain.creationAt;
    entity.updatedAt = domain.updatedAt;
    entity.deletedAt = domain.deletedAt;
    return entity;
  }

  static fromEntity(entity: Product): ProductDomain {
    const domain = new ProductDomain({
      id: entity.id,
      title: entity.title,
      slug: entity.slug,
      description: entity.description,
      price: entity.price,
      images: entity.images,
      availableQuantity: entity.availableQuantity,
      categoryId: entity.category?.id ?? null,
      creationAt: entity.creationAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    });
    // Attach the raw category entity for response mapping
    (domain as ProductDomain & { _categoryEntity?: Category | null })._categoryEntity = entity.category ?? null;
    return domain;
  }

  static toResponse(domain: ProductDomain): ProductResponseDto {
    const catEntity = (domain as ProductDomain & { _categoryEntity?: Category | null })._categoryEntity;
    return {
      id: domain.id!,
      title: domain.title,
      slug: domain.slug,
      description: domain.description,
      price: domain.price,
      images: domain.images,
      availableQuantity: domain.availableQuantity,
      categoryId: domain.categoryId ?? null,
      category: catEntity ? { id: catEntity.id, name: catEntity.name, image: catEntity.image } : null,
      creationAt: domain.creationAt!,
      updatedAt: domain.updatedAt!,
    };
  }
}
