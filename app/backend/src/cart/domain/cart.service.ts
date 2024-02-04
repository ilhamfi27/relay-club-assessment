import { RequestContext } from '@/common/request-context';
import { SupabaseProvider } from '@/supabase/supabase.provider';
import { Injectable, NotFoundException } from '@nestjs/common';
import { AddToCartDto } from '../application/rest/cart.request';
import { awaitToError } from '@/common/await-to-error';

type Product = {
  id: number;
  sku: string;
  price: number;
};

type DiscountRule = {
  rule_type: string;
  quantity: number;
  discount_value: number;
  product: Product;
  discount_product: Product;
};

type Cart = {
  quantity: number;
  product: Product;
};

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

  async getCart() {
    const cart = await this.getCartByUser();

    // Fetch the products associated with the cart
    const { data: products, error: productError } = await this.supabaseProvider
      .from('carts_products')
      .select('quantity, product:products (id, sku, name, price)')
      .eq('cart_id', cart.id);

    if (productError) {
      throw new NotFoundException('Failed to fetch products for the cart');
    }
    return products as unknown as Cart[];
  }

  async addToCart({ product_id, quantity }: AddToCartDto): Promise<any> {
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
      .eq('id', product_id)
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
          product_id: product_id,
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

  async checkout() {
    const [err, cart] = await awaitToError(this.getCart());
    if (err) {
      throw err;
    }

    const totalData = await this.calculateTotalPrice(cart);
    return totalData;
  }

  private async getDiscountRules(): Promise<DiscountRule[]> {
    // Fetch discount rules from Supabase
    const { data: discountRules } = await this.supabaseProvider.from(
      'discount_rules',
    ).select(`
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

    return discountRules as unknown as DiscountRule[];
  }

  private async calculateTotalPrice(productCart: Cart[]) {
    const discountRules = await this.getDiscountRules();
    const cart: Record<number, string> = {};

    productCart.forEach((c) => {
      cart[c.product.sku] = { ...c.product, quantity: c.quantity };
    });

    discountRules.forEach((rule) => {
      const { rule_type, quantity, discount_value, discount_product, product } =
        rule;

      switch (rule_type) {
        case 'BUY_X_GET_Y_FREE':
          if (
            discount_product &&
            cart[discount_product.sku] &&
            cart[discount_product.sku].quantity >= quantity
          ) {
            cart[discount_product.sku].quantity -= discount_value;
          }
          break;

        case 'BULK_PURCHASE_DISCOUNT':
          if (
            product &&
            cart[product.sku] &&
            cart[product.sku].quantity >= quantity
          ) {
            cart[product.sku].price = discount_value;
          }
          break;

        case 'FREE_PRODUCT':
          if (product && cart[product.sku]) {
            cart[discount_product.sku] = {};
            cart[discount_product.sku] = {
              ...discount_product,
              price: 0,
              quantity: cart[product.sku].quantity,
            };
          }
          break;

        default:
          break;
      }
    });

    const total = Object.keys(cart).reduce((acc, key) => {
      const c = cart[key];
      return acc + c.price * c.quantity;
    }, 0);

    return { cart: Object.values(cart), total };
  }
}
