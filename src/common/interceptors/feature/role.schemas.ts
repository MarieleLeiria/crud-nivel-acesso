import { SetMetadata } from '@nestjs/common';
import { Acess } from '../../../enums/acess.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Acess[]) => SetMetadata(ROLES_KEY, roles);

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
