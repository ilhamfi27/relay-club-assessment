import { RequestContext } from '@/common/request-context';
import { Injectable } from '@nestjs/common';
import { AddToCartDto } from '../application/rest/cart.request';
import { awaitToError } from '@/common/await-to-error';
import { CartQuery } from '../infrastructure/db/cart.query';
import { Cart } from '../model/entities/cart.entity';
import { DiscountRuleQuery } from '@/discount-rules/infrastructure/db/discount-rule.query';

@Injectable()
export class CartService {
  constructor(
    private readonly cartQuery: CartQuery,
    private readonly discountRuleQuery: DiscountRuleQuery,
  ) {}

  async getCart() {
    const { user } = RequestContext.getContext();
    const cart = await this.cartQuery.getCartByUser(user.id);

    // Fetch the products associated with the cart
    return this.cartQuery.getCartProducts(cart.id);
  }

  async addToCart({ product_id, quantity }: AddToCartDto): Promise<any> {
    const { user } = RequestContext.getContext();
    let err = null,
      cart = null;
    [err, cart] = await awaitToError(this.cartQuery.getCartByUser(user.id));
    if (err) {
      await this.cartQuery.initiateCart(user.id);
      [err, cart] = await awaitToError(this.cartQuery.getCartByUser(user.id));
    }

    // Add the product to the cart or update the quantity
    await this.cartQuery.upsertCartProduct({
      cart_id: cart.id,
      product_id,
      quantity,
    });

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

  private async calculateTotalPrice(productCart: Cart[]) {
    const discountRules = await this.discountRuleQuery.findAll();
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
