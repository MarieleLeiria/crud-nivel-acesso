import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository, Not } from 'typeorm';
import { RequestUserDto } from './dto/request-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { BadRequestException } from '@nestjs/common';
import { userSeed } from './entities/seed';
import * as bcrypt from 'bcrypt';
import { ResponseUserDto } from './dto/response-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async seedUsers(): Promise<UserEntity[]> {
    const createdUsers: UserEntity[] = [];

    for (const user of userSeed) {
      const hashedPassword = await bcrypt.hash(user.senha, 10);
      const newUser = {
        ...user,
        senha: hashedPassword,
      };

      const savedUser = await this.usersRepository.save(newUser);
      createdUsers.push(savedUser);
    }

    return createdUsers;
  }

  async findAll(userId: string): Promise<UserEntity[]> {
    console.log('userid service', userId);
    try {
      return await this.usersRepository.find({
        where: {
          id: Not(userId),
        },
      });
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      throw new InternalServerErrorException('Erro ao buscar usuários.');
    }
  }

  async findOne(
    field: keyof UserEntity,
    value: string,
  ): Promise<ResponseUserDto> {
    try {
      const user = await this.usersRepository.findOne({
        where: {
          [field]: value,
        },
      });
      if (!user) {
        throw new NotFoundException(
          `Usuário com o ${field} : ${value} não encontrado.`,
        );
      }
      return ResponseUserDto.fromEntity(user);
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Erro ao buscar usuário.');
    }
  }
}
