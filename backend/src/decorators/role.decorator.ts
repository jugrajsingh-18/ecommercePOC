import { SetMetadata } from "@nestjs/common";

export enum Role{
    Admin='Admin',User='User'
}

export const Roles = (roles: Role)=>SetMetadata('roles',roles)