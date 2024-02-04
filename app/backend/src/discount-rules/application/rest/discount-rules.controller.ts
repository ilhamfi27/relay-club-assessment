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

  @Post('/discount-rules')
  @ApiBearerAuth()
  create(@Body() createDiscountRuleDto: CreateDiscountRuleDto) {
    return this.discountRulesService.create({
      ...createDiscountRuleDto,
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

  @Put('/discount-rules/:id')
  @ApiBearerAuth()
  update(
    @Param('id') id: string,
    @Body() updateDiscountRuleDto: UpdateDiscountRuleDto,
  ) {
    return this.discountRulesService.update(+id, {
      ...updateDiscountRuleDto,
    });
  }

  @Delete('/discount-rules/:id')
  remove(@Param('id') id: string) {
    return this.discountRulesService.remove(+id);
  }
}
