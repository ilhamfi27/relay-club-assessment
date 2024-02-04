import { Injectable } from '@nestjs/common';
import { DiscountRuleDto } from '../application/rest/discount-rules.request';
import { DiscountRuleQuery } from '../infrastructure/db/discount-rule.query';

@Injectable()
export class DiscountRulesService {
  constructor(private readonly discountRuleQuery: DiscountRuleQuery) {}
  async findAll() {
    return this.discountRuleQuery.findAll();
  }

  async findOne(id: number) {
    return this.discountRuleQuery.findOne(id);
  }

  async create(discountRuleData: DiscountRuleDto) {
    return this.discountRuleQuery.create(discountRuleData);
  }

  async update(id: number, discountRuleData: DiscountRuleDto) {
    return this.discountRuleQuery.update(id, discountRuleData);
  }

  async remove(id: number) {
    await this.discountRuleQuery.remove(id);
    return { id };
  }
}
