import { ProductCategorys } from 'src/enums/category';
import { ProductProperties } from 'src/enums/properties';
import { ProductScore } from 'src/enums/score';
import { ProductSubcategory } from 'src/enums/subcategory';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ReviewEntity } from './review.entity';

@Entity()
export class ProductEntity {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  price: number;

  @Column({
    nullable: true,
    type: 'enum',
    enum: ProductCategorys,
    enumName: 'product_category_enum',
  })
  category: ProductCategorys;

  @Column({
    nullable: true,
    type: 'enum',
    enum: ProductSubcategory,
    enumName: 'product_subcategory_enum',
  })
  subcategory: ProductSubcategory;

  @Column({
    nullable: true,
    type: 'enum',
    enum: ProductProperties,
    enumName: 'product_properties_enum',
  })
  properties: ProductProperties;

  @Column({
    nullable: true,
    type: 'enum',
    enum: ProductScore,
    enumName: 'product_score_enum',
  })
  score: ProductScore;

  @OneToMany(() => ReviewEntity, (review) => review.product)
  reviews: ReviewEntity[];

  @Column({ nullable: false })
  characteristics: string;

  @Column()
  storage: number;
}
