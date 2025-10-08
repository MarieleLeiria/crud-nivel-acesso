import { ProductScore } from 'src/enums/score';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Collection,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('reviews')
export class ReviewEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  score: ProductScore;

  @Column({ nullable: true })
  comment: string;

  @ManyToOne(() => UserEntity, (user) => user.reviews)
  user: UserEntity;

  @ManyToOne(() => ProductEntity, (product) => product.reviews)
  product: ProductEntity;
}
