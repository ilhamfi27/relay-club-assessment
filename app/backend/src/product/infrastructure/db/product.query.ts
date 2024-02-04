import {
  CreateProductDto,
  UpdateProductDto,
} from '@/product/application/rest/product.request';
import { Product } from '@/product/model/entities/product.entity';
import { SupabaseProvider } from '@/supabase/supabase.provider';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductQuery {
  constructor(private readonly supabaseProvider: SupabaseProvider) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { error } = await this.supabaseProvider
      .from('products')
      .insert([createProductDto]);

    if (error) {
      throw new Error(error.message);
    }

    console.log(createProductDto);

    return createProductDto as Product;
  }

  async findAll() {
    const { data } = await this.supabaseProvider.from('products').select('*');

    return data;
  }
  async getProductById(id: number) {
    const { data: product, error: productError } = await this.supabaseProvider
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (productError || !product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const { data, error } = await this.supabaseProvider
      .from('products')
      .update(updateProductDto)
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
  async removeById(id: number) {
    const { error } = await this.supabaseProvider
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }
  }
}
