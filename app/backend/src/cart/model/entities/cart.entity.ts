import { RuleType } from '@/discount-rules/application/rest/discount-rules.request';
import { Product } from '@/product/model/entities/product.entity';

export class DiscountRule {
  rule_type: RuleType;
  quantity: number;
  discount_value: number;
  product: Product;
  discount_product: Product;
}

export class Cart {
  id: number;
  quantity: number;
  product: Product;
}
