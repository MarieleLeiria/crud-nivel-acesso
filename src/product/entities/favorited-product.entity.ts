import { UserEntity } from 'src/users/entities/user.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('favorited_product')
export class FavoritedProduct {
  @PrimaryColumn()
  productId: string;
  userId: string;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToOne(() => ProductEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId' })
  product: ProductEntity;
}
