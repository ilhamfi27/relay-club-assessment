import { Module } from '@nestjs/common';
import { DiscountRulesService } from './domain/discount-rules.service';
import { DiscountRulesController } from './application/rest/discount-rules.controller';

@Module({
  controllers: [DiscountRulesController],
  providers: [DiscountRulesService],
})
export class DiscountRulesModule {}
