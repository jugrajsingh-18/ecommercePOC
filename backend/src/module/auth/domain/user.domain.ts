export enum Role {
  ADMIN = 'Admin',
  USER = 'User',
}

export interface UserProps {
  id?: string;
  username?: string;
  email: string;
  password: string;
  role: Role;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export class UserDomain {
  id?: string;
  username?: string;
  email: string;
  password: string;
  role: Role;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  accessToken?:string;
  refreshToken?:string;

  constructor(props: UserProps) {
    Object.assign(this, props);
  }
}