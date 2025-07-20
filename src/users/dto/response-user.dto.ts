import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';
import { UserAccess } from 'src/enums/access';

export class ResponseUserDto {
  @ApiProperty({ description: 'User ID', example: '223nb2jh4g' })
  id: string;

  @ApiProperty({ description: 'First name', example: 'Mariele' })
  firstName: string;

  @ApiProperty({ description: 'Last name', example: 'Leiria' })
  lastName: string;

  @ApiProperty({ description: 'Email address', example: 'teste@teste.com' })
  email: string;

  @ApiProperty({
    description: 'User role/access type',
    enum: UserAccess,
    example: UserAccess.ADMIN,
  })
  access: UserAccess;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.access = user.access ?? UserAccess.USER;
  }

  static fromEntity(user: UserEntity): ResponseUserDto {
    return new ResponseUserDto(user);
  }
}
