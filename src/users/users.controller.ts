import {
  Controller,
  Get,
  Post,
  Param,
  InternalServerErrorException,
  HttpException,
  UseGuards,
  Req,
  ForbiddenException,
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
  // @Public()
  @Get()
  @ApiOperation({ summary: 'Lista todos os usuários' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários retornada com sucesso',
  })
  async findAll(@Req() req: { user: { sub: string } }): Promise<UserEntity[]> {
    if (!req.user || !req.user.sub) {
      throw new UnauthorizedException('Usuário não autenticado.');
    }
    const userId = req.user.sub;
    try {
      return this.usersService.findAll(userId);
    } catch (error) {
      console.log('Failed to create user:', error);
      throw new InternalServerErrorException('Erro ao buscar usuários.');
    }
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Retorna usuário por id ou email' })
  @ApiResponse({ status: 200, description: 'Usuário retornado com sucesso' })
  async findOne(
    @Param('id') id: string,
    @Req() req: { user: { sub: string; email: string } }, // Certifique-se de que o payload JWT inclua o email
  ) {
    const loggedUserId = req.user?.sub;
    const loggedUserEmail = req.user?.email;

    const isEmail = id.includes('@');
    const isRequestingOwnData =
      (isEmail && id === loggedUserEmail) || (!isEmail && id === loggedUserId);

    if (isRequestingOwnData) {
      throw new ForbiddenException(
        'Você não pode buscar os seus próprios dados por esta rota.',
      );
    }

    const parameter = isEmail ? 'email' : 'id';

    try {
      const user = await this.usersService.findOne(parameter, id);
      return user;
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao buscar usuário.');
    }
  }
}
