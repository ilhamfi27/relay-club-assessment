import { Module } from '@nestjs/common';
import { CartService } from './domain/cart.service';
import { CartController } from './application/rest/cart.controller';
import { CartQuery } from './infrastructure/db/cart.query';
import { ProductQuery } from '@/product/infrastructure/db/product.query';
import { DiscountRuleQuery } from '@/discount-rules/infrastructure/db/discount-rule.query';

@Module({
  controllers: [CartController],
  providers: [CartService, CartQuery, ProductQuery, DiscountRuleQuery],
})
export class CartModule {}
