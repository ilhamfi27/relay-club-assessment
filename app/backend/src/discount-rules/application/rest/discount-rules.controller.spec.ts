import { Test, TestingModule } from '@nestjs/testing';
import { DiscountRulesController } from './discount-rules.controller';
import { DiscountRulesService } from '../../domain/discount-rules.service';

describe('DiscountRulesController', () => {
  let controller: DiscountRulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiscountRulesController],
      providers: [DiscountRulesService],
    }).compile();

    controller = module.get<DiscountRulesController>(DiscountRulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
