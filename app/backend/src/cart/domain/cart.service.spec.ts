import { TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service';
import { getAppModule } from 'test/fixture/module-fixture';
import { RequestContext } from '@/common/request-context';
import { CartQuery } from '../infrastructure/db/cart.query';
import { DiscountRuleQuery } from '@/discount-rules/infrastructure/db/discount-rule.query';
import { UserRole } from '@/user/model/entity/user.entity';
import { RuleType } from '@/discount-rules/application/rest/discount-rules.request';

jest.mock('../infrastructure/db/cart.query');

describe('src/cart/domain/cart.service.spec.ts', () => {
  let service: CartService;
  let cartQuery: CartQuery;
  let discountRuleQuery: DiscountRuleQuery;

  beforeEach(async () => {
    const module: TestingModule = await getAppModule();
    service = module.get<CartService>(CartService);
    cartQuery = module.get<CartQuery>(CartQuery);
    discountRuleQuery = module.get<DiscountRuleQuery>(DiscountRuleQuery);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCart', () => {
    it('should return the cart products', async () => {
      // Arrange
      const user = {
        id: 1,
        username: 'user',
        name: 'User',
        password: 'pass',
        role: UserRole.BUYER,
      };
      const cart = { id: 'cart-id' };
      const cartProducts = [
        {
          id: 1,
          quantity: 1,
          product: {
            id: 1,
            sku: 'sku',
            name: 'name',
            price: 100,
          },
        },
      ];

      jest.spyOn(RequestContext, 'getContext').mockReturnValue({ user });
      jest.spyOn(cartQuery, 'getCartByUser').mockResolvedValue(cart);
      jest.spyOn(cartQuery, 'getCartProducts').mockResolvedValue(cartProducts);

      // Act
      const result = await service.getCart();

      // Assert
      expect(RequestContext.getContext).toHaveBeenCalled();
      expect(cartQuery.getCartByUser).toHaveBeenCalledWith(user.id);
      expect(cartQuery.getCartProducts).toHaveBeenCalledWith(cart.id);
      expect(result).toEqual(cartProducts);
    });
  });

  describe('addToCart', () => {
    it('should add the product to the cart', async () => {
      // Arrange
      const user = {
        id: 1,
        username: 'user',
        name: 'User',
        password: 'pass',
        role: UserRole.BUYER,
      };
      const product_id = 1;
      const quantity = 2;
      const cart = { id: 'cart-id' };
      const cartProducts = [
        {
          id: 1,
          quantity: 1,
          product: {
            id: 1,
            sku: 'sku',
            name: 'name',
            price: 100,
          },
        },
      ];

      jest.spyOn(RequestContext, 'getContext').mockReturnValue({ user });
      jest.spyOn(cartQuery, 'getCartByUser').mockResolvedValue(cart);
      jest.spyOn(cartQuery, 'getCartProducts').mockResolvedValue(cartProducts);
      jest.spyOn(cartQuery, 'upsertCartProduct').mockResolvedValue(undefined);
      jest.spyOn(service, 'getCart').mockResolvedValue(cartProducts);

      // Act
      const result = await service.addToCart({ product_id, quantity });

      // Assert
      expect(RequestContext.getContext).toHaveBeenCalled();
      expect(cartQuery.getCartByUser).toHaveBeenCalledWith(user.id);
      expect(cartQuery.upsertCartProduct).toHaveBeenCalledWith({
        cart_id: cart.id,
        product_id,
        quantity,
      });
      expect(service.getCart).toHaveBeenCalled();
      expect(result).toEqual(cartProducts);
    });

    it('should initiate a new cart if user does not have a cart', async () => {
      // Arrange
      const user = {
        id: 1,
        username: 'user',
        name: 'User',
        password: 'pass',
        role: UserRole.BUYER,
      };
      const product_id = 1;
      const quantity = 2;
      const cart = { id: 'cart-id' };
      const cartProducts = [
        {
          id: 1,
          quantity: 1,
          product: {
            id: 1,
            sku: 'sku',
            name: 'name',
            price: 100,
          },
        },
      ];

      jest.spyOn(RequestContext, 'getContext').mockReturnValue({ user });
      jest.spyOn(cartQuery, 'getCartByUser').mockRejectedValue(null);
      jest.spyOn(cartQuery, 'initiateCart').mockResolvedValue(undefined);
      jest.spyOn(cartQuery, 'getCartByUser').mockResolvedValue(cart);
      jest.spyOn(cartQuery, 'getCartProducts').mockResolvedValue(cartProducts);
      jest.spyOn(cartQuery, 'upsertCartProduct').mockResolvedValue(undefined);

      // Act
      const result = await service.addToCart({ product_id, quantity });

      // Assert
      expect(RequestContext.getContext).toHaveBeenCalled();
      expect(cartQuery.getCartByUser).toHaveBeenCalledWith(user.id);
      expect(cartQuery.upsertCartProduct).toHaveBeenCalledWith({
        cart_id: cart.id,
        product_id,
        quantity,
      });
      expect(result).toEqual([
        {
          id: 1,
          product: { id: 1, name: 'name', price: 100, sku: 'sku' },
          quantity: 1,
        },
      ]);
    });
  });

  describe('checkout', () => {
    it('should calculate the total price and apply discount rules to the cart', async () => {
      // Arrange
      const cart = [
        {
          id: 1,
          quantity: 2,
          product: {
            id: 1,
            sku: 'sku1',
            name: 'product1',
            price: 100,
          },
        },
        {
          id: 2,
          quantity: 3,
          product: {
            id: 2,
            sku: 'sku2',
            name: 'product2',
            price: 50,
          },
        },
      ];

      const discountRules = [
        {
          rule_type: RuleType.BUY_X_GET_Y_FREE,
          quantity: 2,
          discount_value: 1,
          discount_product: {
            id: 3,
            sku: 'sku3',
            name: 'product3',
            price: 0,
          },
          product: null,
        },
        {
          rule_type: RuleType.BULK_PURCHASE_DISCOUNT,
          quantity: 3,
          discount_value: 40,
          discount_product: null,
          product: {
            id: 2,
            sku: 'sku2',
            name: 'product2',
            price: 50,
          },
        },
        {
          rule_type: RuleType.FREE_PRODUCT,
          quantity: null,
          discount_value: null,
          discount_product: {
            id: 4,
            sku: 'sku4',
            name: 'product4',
            price: 0,
          },
          product: {
            id: 1,
            sku: 'sku1',
            name: 'product1',
            price: 100,
          },
        },
      ];

      const expectedCart = [
        {
          id: 1,
          sku: 'sku1',
          name: 'product1',
          price: 100,
          quantity: 2,
        },
        {
          id: 2,
          sku: 'sku2',
          name: 'product2',
          price: 50,
          quantity: 3,
        },
      ];

      const expectedTotal = 350;

      jest.spyOn(service, 'getCart').mockResolvedValue(cart);
      jest.spyOn(discountRuleQuery, 'findAll').mockResolvedValue(discountRules);
      jest.spyOn(cartQuery, 'getCartByUser').mockResolvedValue(cart);

      // Act
      const result = await service.checkout();

      // Assert
      expect(service.getCart).toHaveBeenCalled();
      expect(result.cart).toEqual(expectedCart);
      expect(result.total).toEqual(expectedTotal);
    });
  });
});
