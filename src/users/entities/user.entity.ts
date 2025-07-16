import { UserAccess } from 'src/enums/access';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: false })
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  senha: string;

  @Column({
    type: 'enum',
    enum: UserAccess,
    enumName: 'user_access_enum',
    nullable: true,
  })
  access: UserAccess | null;
}
