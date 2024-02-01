import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseProvider extends SupabaseClient {
  public readonly supabase: SupabaseClient;

  constructor(private readonly config: ConfigService) {
    const supabaseUrl = config.get('supabase.supabaseUrl');
    const supabaseKey = config.get('supabase.supabaseKey');
    super(supabaseUrl, supabaseKey);
  }
}
