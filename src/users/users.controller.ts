import { Roles } from './../common/interceptors/feature/role.schemas';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
  NotFoundException,
  HttpException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RequestUserDto } from './dto/request-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { UserEntity } from './entities/user.entity';
import { Acess } from 'src/enums/acess.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(Acess.ADMIN)
  @Post()
  async create(@Body() createUserDto: RequestUserDto) {
    try {
      const createdUser = await this.usersService.create(createUserDto);
      return new ResponseUserDto(createdUser);
    } catch (error) {
      console.log('Failed to create user:', error);
      throw new Error('Failed to create user');
    }
  }

  @Post('login')
  async validate(@Body() validateUserDto: RequestUserDto) {
    try {
      const user = await this.usersService.findByEmail(validateUserDto.email);

      if (!user || user.senha !== validateUserDto.senha) {
        throw new Error('Failed to find user');
      }

      return new ResponseUserDto(user);
    } catch (error) {
      console.log('Failed to validate user:', error);
      throw new Error('Failed to validate user');
    }
  }

  @Get()
  async findAll() {
    try {
      const allUsers = await this.usersService.findAll();
      return allUsers.map((user: UserEntity) => new ResponseUserDto(user));
    } catch (error) {
      console.log('Failed to create user:', error);
      throw new InternalServerErrorException('Erro ao buscar usuários.');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const userById = await this.usersService.findOne(id);
      return userById;
    } catch (error) {
      console.log('Failed to get user by id:', error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao buscar usuário por ID.');
    }
  }

  @Roles(Acess.ADMIN)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<RequestUserDto>,
  ) {
    try {
      return await this.usersService.update(id, updateUserDto);
    } catch (error) {
      console.log('Failed to update user:', error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao atualizar .');
    }
  }
  @Roles(Acess.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.usersService.remove(id);
    } catch (error) {
      console.log('Failed to delete user');
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao buscar deletar.');
    }
  }
}
