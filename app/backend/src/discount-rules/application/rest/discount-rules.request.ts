import { IsEnum, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum RuleType {
  BUY_X_GET_Y_FREE = 'BUY_X_GET_Y_FREE',
  BULK_PURCHASE_DISCOUNT = 'BULK_PURCHASE_DISCOUNT',
  FREE_PRODUCT = 'FREE_PRODUCT',
}

export class DiscountRuleDto {
  @IsNumber()
  @ApiProperty()
  readonly product_id?: number;

  @IsEnum(RuleType)
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
