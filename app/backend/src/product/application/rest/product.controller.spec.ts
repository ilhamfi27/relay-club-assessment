import { TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { getAppModule } from 'test/fixture/module-fixture';
import { CreateProductDto, UpdateProductDto } from './product.request';
import { ProductService } from '@/product/domain/product.service';

jest.mock('../../domain/product.service');

const mockCreate = jest.fn(),
  mockFindAll = jest.fn(),
  mockFindOne = jest.fn(),
  mockUpdate = jest.fn(),
  mockRemove = jest.fn();

ProductService.prototype.create = mockCreate;
ProductService.prototype.findAll = mockFindAll;
ProductService.prototype.findOne = mockFindOne;
ProductService.prototype.update = mockUpdate;
ProductService.prototype.remove = mockRemove;

describe('ProductController', () => {
  let controller: ProductController;

  beforeEach(async () => {
    const module: TestingModule = await getAppModule();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call create with the correct parameters', () => {
      // Arrange
      const createProductDto: CreateProductDto = {
        name: 'test',
        price: 100,
        sku: 'test',
      };

      // Act
      controller.create(createProductDto);

      // Assert
      expect(mockCreate).toHaveBeenCalledWith(createProductDto);
    });

    it('should return the result of create', () => {
      // Arrange
      const createProductDto: CreateProductDto = {
        name: 'test',
        price: 100,
        sku: 'test',
      };
      const expectedResult = {
        id: 1,
        name: 'test',
        price: 100,
        sku: 'test',
      };

      mockCreate.mockReturnValue(expectedResult);

      // Act
      const result = controller.create(createProductDto);

      // Assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should call findAll method of productService', () => {
      // Arrange

      // Act
      controller.findAll();

      // Assert
      expect(mockFindAll).toHaveBeenCalled();
    });

    it('should return the result of findAll method of productService', () => {
      // Arrange
      const expectedResult = [
        {
          id: 1,
          name: 'test',
          price: 100,
          sku: 'test',
        },
      ];

      mockFindAll.mockReturnValue(expectedResult);

      // Act
      const result = controller.findAll();

      // Assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should call findOne method of productService with the correct parameter', () => {
      // Arrange
      const id = '1';

      // Act
      controller.findOne(id);

      // Assert
      expect(mockFindOne).toHaveBeenCalledWith(1);
    });

    it('should return the result of findOne method of productService', () => {
      // Arrange
      const id = '1';
      const expectedResult = {
        id: 1,
        name: 'test',
        price: 100,
        sku: 'test',
      };

      mockFindOne.mockReturnValue(expectedResult);

      // Act
      const result = controller.findOne(id);

      // Assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('update', () => {
    it('should call update method of productService with the correct parameters', () => {
      // Arrange
      const id = '1';
      const updateProductDto: UpdateProductDto = {
        name: 'updated test',
        price: 200,
        sku: 'updated test',
      };

      // Act
      controller.update(id, updateProductDto);

      // Assert
      expect(mockUpdate).toHaveBeenCalledWith(+id, updateProductDto);
    });

    it('should return the result of update method of productService', () => {
      // Arrange
      const id = '1';
      const updateProductDto: UpdateProductDto = {
        name: 'updated test',
        price: 200,
        sku: 'updated test',
      };
      const expectedResult = {
        id: 1,
        name: 'updated test',
        price: 200,
        sku: 'updated test',
      };

      mockUpdate.mockReturnValue(expectedResult);

      // Act
      const result = controller.update(id, updateProductDto);

      // Assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('remove', () => {
    it('should call remove method of productService with the correct parameter', () => {
      // Arrange
      const id = '1';

      // Act
      controller.remove(id);

      // Assert
      expect(mockRemove).toHaveBeenCalledWith(+id);
    });

    it('should return the result of remove method of productService', () => {
      // Arrange
      const id = '1';
      const expectedResult = {
        id: 1,
        name: 'test',
        price: 100,
        sku: 'test',
      };

      mockRemove.mockReturnValue(expectedResult);

      // Act
      const result = controller.remove(id);

      // Assert
      expect(result).toEqual(expectedResult);
    });
  });
});
