import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
  HttpException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RequestUserDto } from '../users/dto/request-user.dto';
import { ResponseUserDto } from '../users/dto/response-user.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.AuthService.signIn(
      signInDto.userEmail,
      signInDto.userSenha,
      signInDto.userAccess,
    );
  }

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

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Atualizar usuário' })
  @ApiResponse({ status: 200, description: 'Usuário atualizo com sucesso' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<RequestUserDto>,
  ) {
    try {
      return await this.AuthService.update(id, updateUserDto);
    } catch (error) {
      console.log('Failed to update user:', error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao atualizar .');
    }
  }

  @ApiOperation({ summary: 'Remover pelo id' })
  @ApiResponse({ status: 200, description: 'Usuário deletado com sucesso' })
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.AuthService.remove(id);
    } catch (error) {
      console.log('Failed to delete user');
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Erro ao buscar deletar.');
    }
  }
}
