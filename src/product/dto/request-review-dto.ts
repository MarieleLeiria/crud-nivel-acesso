import { IsInt, IsOptional, IsString, isString } from '@nestjs/class-validator';
import { ProductScore } from 'src/enums/score';

export class RequestReviewDto {
  @IsString()
  @IsOptional()
  comment?: string;

  @IsInt()
  score: ProductScore;
}
