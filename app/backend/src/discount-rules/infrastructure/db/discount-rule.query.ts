import { DiscountRule } from '@/cart/model/entities/cart.entity';
import { DiscountRuleDto } from '@/discount-rules/application/rest/discount-rules.request';
import { SupabaseProvider } from '@/supabase/supabase.provider';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class DiscountRuleQuery {
  constructor(private readonly supabaseProvider: SupabaseProvider) {}
  async findAll() {
    const { data } = await this.supabaseProvider.from('discount_rules').select(`
      id,
      rule_type,
      quantity,
      discount_value,
      product:fk_discount_rules_product_id (
        id,
        sku,
        price,
        name
      ),
      discount_product:fk_discount_rules_discount_product_id (
        id,
        sku,
        price,
        name
      )
    `);
    return data as unknown as DiscountRule[];
  }

  async findOne(id: number) {
    const { data, error } = await this.supabaseProvider
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
    const { data, error } = await this.supabaseProvider
      .from('discount_rules')
      .insert([discountRuleData]);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async update(id: number, discountRuleData: DiscountRuleDto) {
    const { data, error } = await this.supabaseProvider
      .from('discount_rules')
      .update(discountRuleData)
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async remove(id: number) {
    const { error } = await this.supabaseProvider
      .from('discount_rules')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }

    return { id };
  }
}
