import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './users/entities/user.entity';
import { PasswordService } from './password/password.service';
import { ProductService } from './product/product.service';
import { ProductEntity } from './product/entities/product.entity';
import { ProductsModule } from './product/product.module';
import { ReviewEntity } from './product/entities/review.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['env.development.local'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'postgres',
      entities: [UserEntity, ProductEntity, ReviewEntity],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PasswordService, ProductService],
})
export class AppModule {}
