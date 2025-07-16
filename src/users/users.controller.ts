import {
  Controller,
  Get,
  Post,
  Param,
  InternalServerErrorException,
  HttpException,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ResponseUserDto } from './dto/response-user.dto';
import { UserEntity } from './entities/user.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from 'src/common/interceptors/feature/role.schemas';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('/seed')
  @ApiOperation({ summary: 'Popula o banco com usuários fictícios' })
  @ApiResponse({
    status: 201,
    description: 'Usuários criados com sucesso',
    type: [ResponseUserDto],
  })
  async seed() {
    try {
      const users = await this.usersService.seedUsers();
      return users.map((user) => new ResponseUserDto(user));
    } catch (error) {
      console.error('Failed to seed users:', error);
      throw new Error('Failed to seed users');
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Lista todos os usuários' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários retornada com sucesso',
  })
  async findAll(@Req() req): Promise<UserEntity[]> {
    if (!req.user || !req.user.sub) {
      throw new UnauthorizedException('Usuário não autenticado.');
    }
    const userId = req.user.sub;
    console.log('req', userId);
    try {
      return this.usersService.findAll(userId);
    } catch (error) {
      console.log('Failed to create user:', error);
      throw new InternalServerErrorException('Erro ao buscar usuários.');
    }
  }

  @Public()
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
