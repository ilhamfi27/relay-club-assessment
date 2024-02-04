import { TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { getAppModule } from 'test/fixture/module-fixture';
import { CartService } from '@/cart/domain/cart.service';
import { AddToCartDto } from './cart.request';

jest.mock('@/cart/domain/cart.service');

const getCartMock = jest.fn(),
  addToCartMock = jest.fn(),
  checkoutMock = jest.fn();

CartService.prototype.getCart = getCartMock;
CartService.prototype.addToCart = addToCartMock;
CartService.prototype.checkout = checkoutMock;

describe('src/cart/application/rest/cart.controller.spec.ts', () => {
  let controller: CartController;

  beforeEach(async () => {
    const module: TestingModule = await getAppModule();

    controller = module.get<CartController>(CartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('addToCart', () => {
    it('should get the cart', () => {
      // Arrange
      const cart = {}; // Replace with your expected cart object
      getCartMock.mockReturnValueOnce(cart);

      // Act
      const result = controller.getCart();

      // Assert
      expect(getCartMock).toHaveBeenCalledTimes(1);
      expect(result).toEqual(cart);
    });
  });

  describe('addToCart', () => {
    it('should add item to cart', async () => {
      // Arrange
      const addToCartDto: AddToCartDto = {
        product_id: 123,
        quantity: 2,
      };
      const expectedCart = {}; // Replace with your expected cart object
      addToCartMock.mockReturnValueOnce(expectedCart);

      // Act
      const result = await controller.addToCart(addToCartDto);

      // Assert
      expect(addToCartMock).toHaveBeenCalledTimes(1);
      expect(addToCartMock).toHaveBeenCalledWith(addToCartDto);
      expect(result).toEqual(expectedCart);
    });
  });

  describe('checkout', () => {
    it('should checkout the cart', async () => {
      // Arrange
      const expectedCart = {}; // Replace with your expected cart object
      checkoutMock.mockReturnValueOnce(expectedCart);

      // Act
      const result = await controller.checkout();

      // Assert
      expect(checkoutMock).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedCart);
    });
  });
});
