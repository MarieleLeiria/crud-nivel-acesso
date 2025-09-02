import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
  MinLength,
} from '@nestjs/class-validator';
import { UserAccess } from 'src/enums/access';
import { ProductCategorys } from 'src/enums/category';
import { ProductProperties } from 'src/enums/properties';
import { ProductScore } from 'src/enums/score';
import { ProductSubcategory } from 'src/enums/subcategory';

export class RequestProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsString()
  @IsNotEmpty()
  category: ProductCategorys;

  @IsString()
  @IsNotEmpty()
  subcategory: ProductSubcategory;

  @IsString()
  @IsNotEmpty()
  properties: ProductProperties;

  @IsNumber()
  @IsNotEmpty()
  stock: number | null;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  characteristics: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1, { message: 'Score needs to be a value between 1-5' })
  @Max(5, { message: 'Score needs to be a value between 1-5' })
  score: ProductScore;

  @IsString()
  access: UserAccess | null;
}
