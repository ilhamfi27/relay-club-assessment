import { Injectable, NotFoundException } from '@nestjs/common';
import { DiscountRuleDto } from '../application/rest/discount-rules.request';
import { SupabaseProvider } from '@/supabase/supabase.provider';

@Injectable()
export class DiscountRulesService {
  constructor(private readonly supabase: SupabaseProvider) {}
  findAll() {
    return this.supabase.from('discount_rules').select('*');
  }

  async findOne(id: number) {
    const { data, error } = await this.supabase
      .from('discount_rules')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new NotFoundException();
    }

    return data;
  }

  async create(discountRuleData: DiscountRuleDto) {
    const { data, error } = await this.supabase
      .from('discount_rules')
      .insert([discountRuleData]);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async update(id: number, discountRuleData: DiscountRuleDto) {
    const { data, error } = await this.supabase
      .from('discount_rules')
      .update(discountRuleData)
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async remove(id: number) {
    const { error } = await this.supabase
      .from('discount_rules')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }

    return { id };
  }
}
