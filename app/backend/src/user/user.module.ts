import { Module } from '@nestjs/common';
import { UserService } from './domain/user.service';
import { UserController } from './application/rest/user.controller';
import { JwtService } from '@nestjs/jwt';
import { UserQuery } from './infrastructure/db/user.query';

@Module({
  controllers: [UserController],
  providers: [UserService, JwtService, UserQuery],
})
export class UserModule {}
