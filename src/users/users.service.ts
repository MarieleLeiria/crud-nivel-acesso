import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { RequestUserDto } from './dto/request-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: RequestUserDto) {
    try {
      const newUser = this.usersRepository.create({
        ...createUserDto,
        id: uuidv4(),
      });

      return await this.usersRepository.save(newUser);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw new BadRequestException('Não foi possível criar o usuário.');
    }
  }

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
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Erro ao buscar usuário.');
    }
  }

  async update(id: string, updateUserDto: Partial<RequestUserDto>) {
    try {
      const result = await this.usersRepository.update(id, updateUserDto);

      if (result.affected === 0) {
        throw new NotFoundException(
          `Usuário com ID ${id} não encontrado para atualizar.`,
        );
      }
      return { message: 'Usuário atualizado com sucesso' };
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Erro ao atualizar usuário.');
    }
  }

  async remove(id: string) {
    try {
      const result = await this.usersRepository.delete(id);

      if (result.affected === 0) {
        throw new NotFoundException(
          `Usuário com ID ${id} não encontrado para remover.`,
        );
      }
      return { message: 'Usuário removido com sucesso' };
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Erro ao remover usuário.');
    }
  }
}
