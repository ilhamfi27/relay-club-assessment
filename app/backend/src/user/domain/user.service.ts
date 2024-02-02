import { SupabaseProvider } from '@/supabase/supabase.provider';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  UserLoginDto,
  UserRegisterDto,
} from '../application/rest/user.request';
import { hashString } from '@/common/hash';
import { RequestContext } from '@/common/request-context';

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly supabase: SupabaseProvider,
  ) {}

  async login(user: UserLoginDto) {
    const validated = await this.validateUser(
      user.username,
      hashString(user.password),
    );
    if (!validated) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.username, sub: user.username };
    return {
      idToken: this.jwtService.sign(payload, {
        expiresIn: '1y',
        secret: 'supersecretdata',
      }),
    };
  }

  async createUser(userData: UserRegisterDto) {
    userData.password = hashString(userData.password);
    const { data, error } = await this.supabase
      .from('users')
      .insert([{ ...userData }]);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async me() {
    const { user } = RequestContext.getContext();
    return this.findUserByUsername(user.username);
  }

  async verifyToken(token: string) {
    const decoded = this.jwtService.decode(token);
    if (!decoded) {
      throw new UnauthorizedException();
    }
    return this.findUserByUsername(decoded.username);
  }

  private async findUserByUsername(username: string, showPassword = false) {
    const { data, error } = await this.supabase
      .from('users')
      .select('id, username, password, name')
      .eq('username', username)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    if (showPassword) {
      return data;
    }

    delete data.password;
    return data;
  }

  private async validateUser(username: string, password: string): Promise<any> {
    // Check if the user exists in Supabase or your user database
    const user = await this.findUserByUsername(username);

    if (user && user.password === password) {
      const { ...result } = user;
      return result;
    }

    return null;
  }
}
