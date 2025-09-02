import { ProductScore } from '../../enums/score';
import { ApiProperty } from '@nestjs/swagger';
import { ProductCategorys } from 'src/enums/category';
import { ProductProperties } from 'src/enums/properties';
import { ProductSubcategory } from 'src/enums/subcategory';
import { ProductEntity } from '../entities/product.entity';
import { UserEntity } from '../../users/entities/user.entity';

export class ResponseProductDto {
  @ApiProperty({ description: 'Product ID', example: '9g32jkg2' })
  id: string;

  @ApiProperty({
    description: 'Product name',
    example: 'CADEIRA GAMER TGT HERON M, PRETO, TGT-HRM-BK02',
  })
  name: string;

  @ApiProperty({ description: 'Product price', example: 389.99 })
  price: number;

  @ApiProperty({
    description: 'Product category',
    enum: ProductCategorys,
    example: ProductCategorys.EYES,
  })
  category: ProductCategorys;

  @ApiProperty({
    description: 'Subcategory',
    enum: ProductSubcategory,
    example: ProductSubcategory.LIPSTICK,
  })
  subcategory: ProductSubcategory;

  @ApiProperty({
    description: 'Product properties',
    enum: ProductProperties,
    example: ProductProperties.CRUELTY_FREE,
  })
  properties: ProductProperties;

  @ApiProperty({ description: 'Product stock', example: 3 })
  stock: number;

  @ApiProperty({
    description: 'Product score',
    enum: ProductScore,
    example: ProductScore.THREE,
  })
  score: ProductScore;

  @ApiProperty({
    description: 'Product description',
    example: 'Product allowed by ANVISA, great for all types of skin',
  })
  characteristics: string;

  constructor(product: ProductEntity) {
    this.id = product.id;
    this.name = product.name;
    this.price = product.price;
    this.category = product.category;
    this.subcategory = product.subcategory;
    this.properties = product.properties;
    this.score = product.score;
    this.characteristics = product.characteristics;
  }

  static fromProductEntity(product: ProductEntity): ResponseProductDto {
    return new ResponseProductDto(product);
  }
}
