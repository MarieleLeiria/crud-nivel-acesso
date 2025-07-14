import { SetMetadata } from '@nestjs/common';
import { UserAccess } from '../../../enums/access';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserAccess[]) => SetMetadata(ROLES_KEY, roles);

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
