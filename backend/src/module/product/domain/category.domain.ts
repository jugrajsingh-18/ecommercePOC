export interface CategoryProps {
  id?: number;
  name: string;
  image?: string | null;
  creationAt?: Date;
  updatedAt?: Date;
}

export class CategoryDomain {
  id?: number;
  name: string;
  image?: string | null;
  creationAt?: Date;
  updatedAt?: Date;

  constructor(props: CategoryProps) {
    this.id = props.id;
    this.name = props.name;
    this.image = props.image;
    this.creationAt = props.creationAt;
    this.updatedAt = props.updatedAt;
  }
}