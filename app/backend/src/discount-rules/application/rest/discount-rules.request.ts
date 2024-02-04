import { IsEnum, IsNumber } from 'class-validator';
import { ApiProperty, OmitType } from '@nestjs/swagger';

export enum RuleType {
  BUY_X_GET_Y_FREE = 'BUY_X_GET_Y_FREE',
  BULK_PURCHASE_DISCOUNT = 'BULK_PURCHASE_DISCOUNT',
  FREE_PRODUCT = 'FREE_PRODUCT',
}

export class DiscountRuleDto {
  @IsNumber()
  @ApiProperty()
  readonly product_id?: number;

  @IsEnum(RuleType)
  @ApiProperty({
    enum: Object.values(RuleType),
    description: `RuleType: ${Object.values(RuleType).join(', ')}\n
    * BUY_X_GET_Y_FREE: Purchase a specified amount of a product and receive a corresponding quantity of the same product at no cost.
    * BULK_PURCHASE_DISCOUNT: Reduction in price when a specific quantity of a product is bought.
    * FREE_PRODUCT: Purchase a specific quantity of one product and receive a specific quantity of another product at no cost.`,
  })
  readonly rule_type?: RuleType;

  @IsNumber()
  @ApiProperty()
  readonly quantity?: number;

  @IsNumber()
  @ApiProperty()
  readonly discount_value?: number;

  @IsNumber()
  @ApiProperty()
  readonly discount_product_id?: number;
}

export class CreateDiscountRuleDto extends OmitType(DiscountRuleDto, []) {}
export class UpdateDiscountRuleDto extends OmitType(DiscountRuleDto, []) {}
