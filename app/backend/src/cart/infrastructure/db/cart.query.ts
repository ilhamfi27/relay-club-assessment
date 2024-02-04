import { Cart } from '@/cart/model/entities/cart.entity';
import { SupabaseProvider } from '@/supabase/supabase.provider';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CartQuery {
  constructor(private readonly supabaseProvider: SupabaseProvider) {}
  async getCartByUser(user_id: number) {
    const { data: cart, error } = await this.supabaseProvider
      .from('carts')
      .select('*')
      .eq('user_id', user_id)
      .single();

    if (error || !cart) {
      throw new NotFoundException('Cart not found');
    }
    return cart;
  }

  async getCartProducts(cart_id: number) {
    // Fetch the products associated with the cart
    const { data: products, error: productError } = await this.supabaseProvider
      .from('carts_products')
      .select('quantity, product:products (id, sku, name, price)')
      .eq('cart_id', cart_id);

    if (productError) {
      throw new NotFoundException('Failed to fetch products for the cart');
    }
    return products as unknown as Cart[];
  }

  async initiateCart(user_id: number) {
    return this.supabaseProvider.from('carts').insert([{ user_id: user_id }]);
  }

  async upsertCartProduct({ cart_id, product_id, quantity }) {
    const { error: addToCartError } = await this.supabaseProvider
      .from('carts_products')
      .upsert([
        {
          cart_id: cart_id,
          product_id: product_id,
          quantity,
        },
      ]);

    if (addToCartError) {
      throw new Error('Failed to add product to cart');
    }
  }
}
