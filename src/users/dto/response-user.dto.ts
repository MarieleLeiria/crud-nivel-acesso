//import { Acess } from 'src/enums/acess.enum';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';
import { UserAccess } from 'src/enums/access';

export class ResponseUserDto {
  @ApiProperty({ description: 'User id', example: '223nb2jh4g' })
  id: string;

  @ApiProperty({ description: 'Username', example: 'Mariele' })
  firstName: string;

  @ApiProperty({ description: 'User lastname', example: 'Leiria' })
  lastName: string;

  @ApiProperty({ description: 'User email', example: 'teste@teste' })
  email: string;

  @ApiProperty({ description: 'User password', example: 'pizza123' })
  senha: string;

  @ApiProperty({ description: 'User type', example: 'admin' })
  access: UserAccess;

  constructor(user: Partial<UserEntity>) {
    this.id = user.id ?? '';
    this.firstName = user.firstName ?? '';
    this.lastName = user.lastName ?? '';
    this.email = user.email ?? '';
    this.access = user.access ?? UserAccess.USER;
  }
}
