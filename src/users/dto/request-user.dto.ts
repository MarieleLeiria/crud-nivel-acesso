import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  MinLength,
} from '@nestjs/class-validator';

export class RequestUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  email: string;

  @IsString()
  access: 'admin' | 'user';

  @IsBoolean()
  isActive: boolean;
}
