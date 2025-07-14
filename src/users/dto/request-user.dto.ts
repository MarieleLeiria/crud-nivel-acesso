import { IsNotEmpty, IsString, MinLength } from '@nestjs/class-validator';
import { UserAccess } from 'src/enums/access';

export class RequestUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  senha: string;

  @IsString()
  access: UserAccess | null;
}
