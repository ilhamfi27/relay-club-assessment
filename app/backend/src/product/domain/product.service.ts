import { Injectable } from '@nestjs/common';
import {
  CreateProductDto,
  UpdateProductDto,
} from '../application/rest/product.request';
import { SupabaseProvider } from '@/supabase/supabase.provider';

@Injectable()
export class ProductService {
  constructor(private readonly supabase: SupabaseProvider) {}
  async create(createProductDto: CreateProductDto) {
    const { data, error } = await this.supabase
      .from('products')
      .insert([createProductDto]);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
  async findAll() {
    const { data } = await this.supabase.from('products').select('*');

    return data;
  }
  async findOne(id: number) {
    const { data, error } = await this.supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const { data, error } = await this.supabase
      .from('products')
      .update(updateProductDto)
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async remove(id: number) {
    const { error } = await this.supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }

    return { id };
  }
}
