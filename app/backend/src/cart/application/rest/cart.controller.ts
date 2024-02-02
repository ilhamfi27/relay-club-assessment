import { CartService } from '@/cart/domain/cart.service';
import { Controller, Get, Body, Put } from '@nestjs/common';
import { AddToCartDto } from './cart.request';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('')
  @ApiBearerAuth()
  async getCart(): Promise<any> {
    return await this.cartService.getCart();
  }

  @Put('/products')
  @ApiBearerAuth()
  async addToCart(@Body() addToCartDto: AddToCartDto): Promise<any> {
    const { productId, quantity } = addToCartDto;
    return await this.cartService.addToCart({ productId, quantity });
  }
}
