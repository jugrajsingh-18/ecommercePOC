export interface ProductProps {
  id?: number;

  title: string;
  slug: string;
  description: string;
  price: number;

  images?: string[];

  availableQuantity?: number;

  categoryId?: number | null;

  creationAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export class ProductDomain {
  id?: number;

  title: string;
  slug: string;
  description: string;
  price: number;

  images?: string[];

  availableQuantity?: number;

  categoryId?: number | null;

  creationAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;

  constructor(props: ProductProps) {
    Object.assign(this, props);
  }
}