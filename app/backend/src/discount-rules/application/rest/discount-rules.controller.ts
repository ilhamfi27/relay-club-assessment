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
import { DiscountRuleDto } from './discount-rules.request';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Discount Rules')
export class DiscountRulesController {
  constructor(private readonly discountRulesService: DiscountRulesService) {}

  @Post('/products/:product_id/discount-rules')
  create(@Body() createDiscountRuleDto: DiscountRuleDto) {
    return this.discountRulesService.create(createDiscountRuleDto);
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
  update(
    @Param('product_id') product_id: string,
    @Param('id') id: string,
    @Body() updateDiscountRuleDto: DiscountRuleDto,
  ) {
    return this.discountRulesService.update(+id, updateDiscountRuleDto);
  }

  @Delete('/discount-rules/:id')
  remove(@Param('id') id: string) {
    return this.discountRulesService.remove(+id);
  }
}
