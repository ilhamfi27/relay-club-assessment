import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from '../../domain/user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserLoginDto, UserRegisterDto } from './user.request';

@Controller()
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto) {
    return this.userService.login(userLoginDto);
  }

  @Post('users')
  async register(@Body() createUserDto: UserRegisterDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get('users/me')
  @ApiBearerAuth()
  async me() {
    return this.userService.me();
  }
}
