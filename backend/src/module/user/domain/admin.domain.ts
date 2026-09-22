import { Role } from '../infrastructure/entity/user.entity';

export class UserDomain {
  constructor(
    public id: string,
    public username: string,
    public email: string,
    public role: Role,
    public createdAt: Date,
  ) {}
}

export class PaginatedUsersDomain {
  constructor(
    public data: UserDomain[],
    public meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    },
  ) {}
}