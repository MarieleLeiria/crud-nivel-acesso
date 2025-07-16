import { UsersService } from 'src/users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RequestUserDto } from 'src/users/dto/request-user.dto';
import { UserEntity } from '../users/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: RequestUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.senha, 10);
      const newUser = this.usersRepository.create({
        ...createUserDto,
        id: uuidv4(),
        senha: hashedPassword,
      });

      return await this.usersRepository.save(newUser);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw new BadRequestException('Não foi possível criar o usuário.');
    }
  }

  async signIn(
    userEmail: string,
    userSenha: string,
    userAccess: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(userEmail);

    if (!user || !(await bcrypt.compare(userSenha, user.senha))) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email, access: user.access };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
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
      console.log('user service', this.usersService);
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
