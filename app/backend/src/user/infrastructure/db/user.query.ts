import { SupabaseProvider } from '@/supabase/supabase.provider';
import { UserRegisterDto } from '@/user/application/rest/user.request';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserQuery {
  constructor(private readonly supabaseProvider: SupabaseProvider) {}
  async findUserByUsername(username: string, showPassword = false) {
    const { data, error } = await this.supabaseProvider
      .from('users')
      .select('id, username, password, name, role')
      .eq('username', username)
      .single();

    if (error) {
      throw new NotFoundException();
    }

    if (showPassword) {
      return data;
    }

    delete data.password;
    return data;
  }

  async createUser(userData: UserRegisterDto) {
    const { data, error } = await this.supabaseProvider
      .from('users')
      .insert([{ ...userData }]);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
}
