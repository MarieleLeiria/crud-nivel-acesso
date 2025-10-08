import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { PasswordService } from 'src/password/password.service';
import { ProductService } from 'src/product/product.service';
import { ProductEntity } from 'src/product/entities/product.entity';
import { ProductsModule } from 'src/product/product.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PasswordService],
  exports: [AuthService],
})
export class AuthModule {}
