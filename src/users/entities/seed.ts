import { v4 as uuidv4 } from 'uuid';
import { UserAccess } from 'src/enums/access';
import { UserEntity } from './user.entity';

export const userSeed: UserEntity[] = [
  {
    id: uuidv4(),
    firstName: 'Mariele',
    lastName: 'Leiria',
    email: 'mariele.leiria@example.com',
    senha: 'senha123',
    access: UserAccess.ADMIN,
  },
  {
    id: uuidv4(),
    firstName: 'João',
    lastName: 'Silva',
    email: 'joao.silva@example.com',
    senha: 'senha123',
    access: UserAccess.USER,
  },
  {
    id: uuidv4(),
    firstName: 'Ana',
    lastName: 'Souza',
    email: 'ana.souza@example.com',
    senha: 'senha123',
    access: null,
  },
];
