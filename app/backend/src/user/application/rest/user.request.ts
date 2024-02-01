import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

export class UserRegisterDto extends UserLoginDto {
  @ApiProperty()
  name: string;
}
