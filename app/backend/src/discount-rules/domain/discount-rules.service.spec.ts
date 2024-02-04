import { TestingModule } from '@nestjs/testing';
import { DiscountRulesService } from './discount-rules.service';
import { getAppModule } from 'test/fixture/module-fixture';
import { DiscountRuleQuery } from '../infrastructure/db/discount-rule.query';
import { DiscountRuleDto } from '../application/rest/discount-rules.request';

jest.mock('../infrastructure/db/discount-rule.query');
const createMock = jest.fn(),
  findAllMock = jest.fn(),
  findOneMock = jest.fn(),
  updateMock = jest.fn(),
  removeMock = jest.fn();
DiscountRuleQuery.prototype.create = createMock;
DiscountRuleQuery.prototype.findAll = findAllMock;
DiscountRuleQuery.prototype.findOne = findOneMock;
DiscountRuleQuery.prototype.update = updateMock;
DiscountRuleQuery.prototype.remove = removeMock;

describe('DiscountRulesService', () => {
  let service: DiscountRulesService;

  beforeEach(async () => {
    const module: TestingModule = await getAppModule();

    service = module.get<DiscountRulesService>(DiscountRulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
describe('DiscountRulesService', () => {
  let service: DiscountRulesService;

  beforeEach(async () => {
    const module: TestingModule = await getAppModule();

    service = module.get<DiscountRulesService>(DiscountRulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should call findAll method of DiscountRuleQuery', async () => {
      // Arrange
      findAllMock.mockResolvedValue([]);

      // Act
      await service.findAll();

      // Assert
      expect(findAllMock).toHaveBeenCalled();
    });

    it('should return the result of findAll method of DiscountRuleQuery', async () => {
      // Arrange
      const expectedResult = [
        {
          id: 1,
          rule_type: 'BUY_X_GET_Y_FREE',
          quantity: 3,
          discount_value: 1,
          product: {
            id: 1,
            sku: 'ipd',
            name: 'Super iPad',
            price: 549.99,
          },
          discount_product: {
            id: 1,
            sku: 'ipd',
            name: 'Super iPad',
            price: 549.99,
          },
        },
        {
          id: 2,
          rule_type: 'BULK_PURCHASE_DISCOUNT',
          quantity: 5,
          discount_value: 499.99,
          product: {
            id: 2,
            sku: 'mbp',
            name: 'MacBook Pro',
            price: 1399.99,
          },
          discount_product: null,
        },
        {
          id: 3,
          rule_type: 'FREE_PRODUCT',
          quantity: 1,
          discount_value: null,
          product: {
            id: 3,
            sku: 'atv',
            name: 'Apple TV',
            price: 109.5,
          },
          discount_product: {
            id: 4,
            sku: 'vga',
            name: 'VGA adapter',
            price: 30,
          },
        },
      ];

      findAllMock.mockResolvedValue(expectedResult);

      // Act
      const result = await service.findAll();

      // Assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should call findOne method of DiscountRuleQuery with the provided id', async () => {
      // Arrange
      const id = 1;
      findOneMock.mockResolvedValue({});

      // Act
      await service.findOne(id);

      // Assert
      expect(findOneMock).toHaveBeenCalledWith(id);
    });

    it('should return the result of findOne method of DiscountRuleQuery', async () => {
      // Arrange
      const id = 1;
      const expectedResult = {
        id: 1,
        rule_type: 'BUY_X_GET_Y_FREE',
        quantity: 3,
        discount_value: 1,
        product: {
          id: 1,
          sku: 'ipd',
          name: 'Super iPad',
          price: 549.99,
        },
        discount_product: {
          id: 1,
          sku: 'ipd',
          name: 'Super iPad',
          price: 549.99,
        },
      };
      findOneMock.mockResolvedValue(expectedResult);

      // Act
      const result = await service.findOne(id);

      // Assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('create', () => {
    it('should call create method of DiscountRuleQuery with the provided data', async () => {
      // Arrange
      const discountRuleData: DiscountRuleDto = {
        // Provide the necessary data for the discount rule
      };
      createMock.mockResolvedValue({});

      // Act
      await service.create(discountRuleData);

      // Assert
      expect(createMock).toHaveBeenCalledWith(discountRuleData);
    });

    it('should return the result of create method of DiscountRuleQuery', async () => {
      // Arrange
      const discountRuleData: DiscountRuleDto = {
        // Provide the necessary data for the discount rule
      };
      const expectedResult = {
        // Provide the expected result of the create method
      };
      createMock.mockResolvedValue(expectedResult);

      // Act
      const result = await service.create(discountRuleData);

      // Assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('update', () => {
    it('should call update method of DiscountRuleQuery with the provided id and discountRuleData', async () => {
      // Arrange
      const id = 1;
      const discountRuleData: DiscountRuleDto = {
        // Provide the necessary data for the discount rule
      };
      updateMock.mockResolvedValue({});

      // Act
      await service.update(id, discountRuleData);

      // Assert
      expect(updateMock).toHaveBeenCalledWith(id, discountRuleData);
    });

    it('should return the result of update method of DiscountRuleQuery', async () => {
      // Arrange
      const id = 1;
      const discountRuleData: DiscountRuleDto = {
        // Provide the necessary data for the discount rule
      };
      const expectedResult = {
        // Provide the expected result of the update method
      };
      updateMock.mockResolvedValue(expectedResult);

      // Act
      const result = await service.update(id, discountRuleData);

      // Assert
      expect(result).toEqual(expectedResult);
    });
  });
  describe('remove', () => {
    it('should call remove method of DiscountRuleQuery with the provided id', async () => {
      // Arrange
      const id = 1;
      removeMock.mockResolvedValue(undefined);

      // Act
      await service.remove(id);

      // Assert
      expect(removeMock).toHaveBeenCalledWith(id);
    });

    it('should return the removed id', async () => {
      // Arrange
      const id = 1;
      removeMock.mockResolvedValue(undefined);

      // Act
      const result = await service.remove(id);

      // Assert
      expect(result).toEqual({ id });
    });
  });
});
