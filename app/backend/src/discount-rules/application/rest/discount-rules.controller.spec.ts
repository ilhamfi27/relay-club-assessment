import { Test, TestingModule } from '@nestjs/testing';
import { DiscountRulesController } from './discount-rules.controller';
import { DiscountRulesService } from '../../domain/discount-rules.service';
import { DiscountRule } from '@/cart/model/entities/cart.entity';
import { RuleType } from './discount-rules.request';

jest.mock('../../domain/discount-rules.service');

const findAllMock = jest.fn(),
  findOneMock = jest.fn(),
  createMock = jest.fn(),
  updateMock = jest.fn(),
  removeMock = jest.fn();

DiscountRulesService.prototype.findAll = findAllMock;
DiscountRulesService.prototype.findOne = findOneMock;
DiscountRulesService.prototype.create = createMock;
DiscountRulesService.prototype.update = updateMock;
DiscountRulesService.prototype.remove = removeMock;

describe('src/discount-rules/application/rest/discount-rules.controller.spec.ts', () => {
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

  describe('create', () => {
    it('should create a discount rule', () => {
      // Arrange
      const createDiscountRuleDto: DiscountRule = {
        product: {
          id: 123,
          name: 'Product 1',
          price: 100,
          sku: 'SKU-1',
        },
        quantity: 10,
        rule_type: RuleType.FREE_PRODUCT,
        discount_product: {
          id: 456,
          name: 'Product 2',
          price: 50,
          sku: 'SKU-2',
        },
        discount_value: 10,
      };

      // Act
      controller.create(createDiscountRuleDto);

      // Assert
      expect(createMock).toHaveBeenCalledWith({
        ...createDiscountRuleDto,
      });
    });
  });
});
