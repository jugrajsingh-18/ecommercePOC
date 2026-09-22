import { Module } from '@nestjs/common';
import { UserController } from './controller/controller.controller';
import { UserEntity } from './infrastructure/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './infrastructure/repository/user.repository';
import { UserService } from './service/service.service';

@Module({
  imports:[ TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService,UserRepository],
   exports: [
    TypeOrmModule,
    UserRepository
  ],
})
export class UserModule {}

