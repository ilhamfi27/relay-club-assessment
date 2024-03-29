import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  UserLoginDto,
  UserRegisterDto,
} from '../application/rest/user.request';
import { hashString } from '@/common/hash';
import { RequestContext } from '@/common/request-context';
import { awaitToError } from '@/common/await-to-error';
import { UserQuery } from '../infrastructure/db/user.query';

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userQuery: UserQuery,
  ) {}

  async login(user: UserLoginDto) {
    let validated = false;

    const [, userDb] = await awaitToError(
      this.userQuery.findUserByUsername(user.username, true),
    );

    if (userDb && userDb.password === hashString(user.password)) {
      validated = true;
    }

    if (!validated) {
      throw new UnauthorizedException();
    }
    userDb.password = undefined;

    const payload = { username: user.username, sub: user.username };
    return {
      idToken: this.jwtService.sign(payload, {
        expiresIn: '1y',
        secret: 'supersecretdata',
      }),
      user: userDb,
    };
  }

  async createUser(userData: UserRegisterDto) {
    userData.password = hashString(userData.password);
    return this.userQuery.createUser(userData);
  }

  async me() {
    const { user } = RequestContext.getContext();
    return this.userQuery.findUserByUsername(user.username);
  }

  async verifyToken(token: string) {
    const decoded = this.jwtService.decode(token);
    if (!decoded) {
      throw new UnauthorizedException();
    }
    return this.userQuery.findUserByUsername(decoded.username);
  }
}
