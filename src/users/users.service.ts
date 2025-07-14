import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findAll() {
    try {
      return await this.usersRepository.find();
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      throw new InternalServerErrorException('Erro ao buscar usuários.');
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.usersRepository.findOne({
        where: {
          id,
        },
      });
      if (!user) {
        throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
      }
      return user;
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Erro ao buscar usuário.');
    }
  }
}
