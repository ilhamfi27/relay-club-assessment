import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { DiscountRulesService } from '../../domain/discount-rules.service';
import {
  CreateDiscountRuleDto,
  UpdateDiscountRuleDto,
} from './discount-rules.request';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Discount Rules')
export class DiscountRulesController {
  constructor(private readonly discountRulesService: DiscountRulesService) {}

  @Post('/products/:product_id/discount-rules')
  @ApiBearerAuth()
  create(
    @Param('product_id') product_id: string,
    @Body() createDiscountRuleDto: CreateDiscountRuleDto,
  ) {
    return this.discountRulesService.create({
      ...createDiscountRuleDto,
      product_id: +product_id,
    });
  }

  @Get('/discount-rules')
  findAll() {
    return this.discountRulesService.findAll();
  }

  @Get('/discount-rules/:id')
  findOne(@Param('id') id: string) {
    return this.discountRulesService.findOne(+id);
  }

  @Put('/products/:product_id/discount-rules/:id')
  @ApiBearerAuth()
  update(
    @Param('product_id') product_id: string,
    @Param('id') id: string,
    @Body() updateDiscountRuleDto: UpdateDiscountRuleDto,
  ) {
    return this.discountRulesService.update(+id, {
      ...updateDiscountRuleDto,
      product_id: +product_id,
    });
  }

  @Delete('/discount-rules/:id')
  remove(@Param('id') id: string) {
    return this.discountRulesService.remove(+id);
  }
}
