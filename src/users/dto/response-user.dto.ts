import { UserEntity } from '../entities/user.entity';

export class ResponseUserDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;

  constructor(user: Partial<UserEntity>) {
    this.id = user.id ?? '';
    this.firstName = user.firstName ?? '';
    this.lastName = user.lastName ?? '';
    this.email = user.email ?? '';
  }
}
