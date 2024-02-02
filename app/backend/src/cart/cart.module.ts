import { Module } from '@nestjs/common';
import { CartService } from './domain/cart.service';
import { CartController } from './application/rest/cart.controller';

@Module({
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
