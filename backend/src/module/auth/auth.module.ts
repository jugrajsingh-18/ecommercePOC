import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UserEntity } from '../user/infrastructure/entity/user.entity';
import { UserRepository } from '../user/infrastructure/repository/user.repository';
@Module({
 imports:[  TypeOrmModule.forFeature([UserEntity]),JwtModule],
  controllers: [AuthController],
  providers: [AuthService,UserRepository],
  exports:[AuthService]
})
export class AuthModule {}
