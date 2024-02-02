import { CartService } from '@/cart/domain/cart.service';
import { Controller, Get, Body, Put } from '@nestjs/common';
import { AddToCartDto } from './cart.request';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('carts')
@ApiTags('Cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('')
  @ApiBearerAuth()
  getCart() {
    return this.cartService.getCart();
  }

  @Put('/products')
  @ApiBearerAuth()
  addToCart(@Body() addToCartDto: AddToCartDto) {
    const { productId, quantity } = addToCartDto;
    return this.cartService.addToCart({ productId, quantity });
  }

  @Get('/checkout')
  @ApiBearerAuth()
  checkout() {
    return this.cartService.checkout();
  }
}
