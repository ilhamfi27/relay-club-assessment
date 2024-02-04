import { Module } from '@nestjs/common';
import { DiscountRulesService } from './domain/discount-rules.service';
import { DiscountRulesController } from './application/rest/discount-rules.controller';
import { DiscountRuleQuery } from './infrastructure/db/discount-rule.query';

@Module({
  controllers: [DiscountRulesController],
  providers: [DiscountRulesService, DiscountRuleQuery],
})
export class DiscountRulesModule {}
