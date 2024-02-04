import { TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { getAppModule } from 'test/fixture/module-fixture';
import { CreateProductDto } from '../application/rest/product.request';
import { ProductQuery } from '../infrastructure/db/product.query';
import { Product } from '../model/entities/product.entity';

jest.mock('../infrastructure/db/product.query');

describe('src/product/domain/product.service.spec.ts', () => {
  let service: ProductService;
  let productQuery: ProductQuery;

  beforeEach(async () => {
    const module: TestingModule = await getAppModule();

    service = module.get<ProductService>(ProductService);
    productQuery = module.get<ProductQuery>(ProductQuery);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new product', async () => {
      // Arrange
      const createProductDto: CreateProductDto = {
        name: 'Test Product',
        price: 100,
        sku: 'test-sku',
      };

      jest
        .spyOn(productQuery, 'create')
        .mockResolvedValue(createProductDto as Product);

      // Act
      const result = await service.create(createProductDto);

      // Assert
      // Add your assertions here
      expect(productQuery.create).toHaveBeenCalled();
      expect(result).toEqual(createProductDto);
    });
  });

  describe('findAll', () => {
    it('should find all products', async () => {
      // Arrange
      const products: Product[] = [
        { id: 1, name: 'Product 1', price: 10, sku: 'sku-1' },
        { id: 2, name: 'Product 2', price: 20, sku: 'sku-2' },
      ];

      jest.spyOn(productQuery, 'findAll').mockResolvedValue(products);

      // Act
      const result = await service.findAll();
      console.log(result);

      // Assert
      expect(productQuery.findAll).toHaveBeenCalled();
      expect(result).toEqual(products);
    });
  });
});
