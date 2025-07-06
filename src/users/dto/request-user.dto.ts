import { IsNotEmpty, IsString, MinLength } from '@nestjs/class-validator';

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
  access: 'admin' | 'user' | null;
}
