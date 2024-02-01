import { Module } from '@nestjs/common';
import { UserService } from './domain/user.service';
import { UserController } from './application/rest/user.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UserController],
  providers: [UserService, JwtService],
})
export class UserModule {}
