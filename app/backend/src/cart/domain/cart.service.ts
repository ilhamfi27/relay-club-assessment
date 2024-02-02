import { RequestContext } from '@/common/request-context';
import { SupabaseProvider } from '@/supabase/supabase.provider';
import { Injectable, NotFoundException } from '@nestjs/common';
import { AddToCartDto } from '../application/rest/cart.request';
import { awaitToError } from '@/common/await-to-error';

@Injectable()
export class CartService {
  constructor(private readonly supabaseProvider: SupabaseProvider) {}

  private async getCartByUser() {
    const { user } = RequestContext.getContext();
    const { data: cart, error } = await this.supabaseProvider
      .from('carts')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error || !cart) {
      throw new NotFoundException('Cart not found');
    }
    return cart;
  }

  async getCart(): Promise<any> {
    const cart = await this.getCartByUser();

    // Fetch the products associated with the cart
    const { data: products, error: productError } = await this.supabaseProvider
      .from('carts_products')
      .select('product_id, quantity')
      .eq('cart_id', cart.id);

    if (productError) {
      throw new Error('Failed to fetch products for the cart');
    }

    // Add the products to the cart response
    cart.products = products || [];

    return cart;
  }

  async addToCart({ productId, quantity }: AddToCartDto): Promise<any> {
    const { user } = RequestContext.getContext();
    let err = null,
      cart = null;
    [err, cart] = await awaitToError(this.getCartByUser());
    if (err) {
      await this.supabaseProvider.from('carts').insert([{ user_id: user.id }]);
      [err, cart] = await awaitToError(this.getCartByUser());
    }
    const { data: product, error: productError } = await this.supabaseProvider
      .from('products')
      .select('*')
      .eq('id', productId)
      .single();

    if (productError || !product) {
      throw new NotFoundException('Product not found');
    }

    // Add the product to the cart or update the quantity
    const { error: addToCartError } = await this.supabaseProvider
      .from('carts_products')
      .upsert([
        {
          cart_id: cart.id,
          product_id: productId,
          quantity,
        },
      ]);

    if (addToCartError) {
      throw new Error('Failed to add product to cart');
    }

    // Recalculate the total and update the cart
    const updatedCart = await this.getCart();

    return updatedCart;
  }
}
