import {
  Controller,
  Get,
  Param,
  InternalServerErrorException,
  HttpException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ResponseUserDto } from './dto/response-user.dto';
import { UserEntity } from './entities/user.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todos os usuários' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários retornada com sucesso',
  })
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
  @ApiOperation({ summary: 'Retorna usuário por id' })
  @ApiResponse({ status: 200, description: 'Usuário retornado com sucesso' })
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
}
