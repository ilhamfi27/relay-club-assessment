import { Injectable } from '@nestjs/common';
import { CreateDiscountRuleDto } from '../dto/create-discount-rule.dto';
import { UpdateDiscountRuleDto } from '../dto/update-discount-rule.dto';

@Injectable()
export class DiscountRulesService {
  create(createDiscountRuleDto: CreateDiscountRuleDto) {
    return 'This action adds a new discountRule';
  }

  findAll() {
    return `This action returns all discountRules`;
  }

  findOne(id: number) {
    return `This action returns a #${id} discountRule`;
  }

  update(id: number, updateDiscountRuleDto: UpdateDiscountRuleDto) {
    return `This action updates a #${id} discountRule`;
  }

  remove(id: number) {
    return `This action removes a #${id} discountRule`;
  }
}
