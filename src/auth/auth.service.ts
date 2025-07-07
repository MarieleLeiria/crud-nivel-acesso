import { UsersService } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RequestUserDto } from 'src/users/dto/request-user.dto';
import { UserEntity } from '../users/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private UsersService: UsersService,
    private JwtService: JwtService,
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

  async signIn(
    userEmail: string,
    userSenha: string,
  ): Promise<{ acess_token: string }> {
    const user = await this.UsersService.findOne(userEmail);
    if (user?.senha !== userSenha) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };
    return {
      acess_token: await this.JwtService.signAsync(payload),
    };
  }
}
