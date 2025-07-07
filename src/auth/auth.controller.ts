import { UsersService } from './../users/users.service';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from './../common/interceptors/feature/role.schemas';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Acess } from 'src/enums/acess.enum';
import { RequestUserDto } from '../users/dto/request-user.dto';
import { ResponseUserDto } from '../users/dto/response-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.AuthService.signIn(signInDto.userEmail, signInDto.userSenha);
  }

  //@Roles(Acess.ADMIN)
  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
    type: ResponseUserDto,
  })
  async create(@Body() createUserDto: RequestUserDto) {
    try {
      const createdUser = await this.AuthService.create(createUserDto);
      return new ResponseUserDto(createdUser);
    } catch (error) {
      console.log('Failed to create user:', error);
      throw new Error('Failed to create user');
    }
  }
}
