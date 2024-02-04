import { getAppModule } from 'test/fixture/module-fixture';
import { ProductService } from './product.service';
import {
  CreateProductDto,
  UpdateProductDto,
} from '../application/rest/product.request';
import { ProductQuery } from '../infrastructure/db/product.query';

jest.mock('../infrastructure/db/product.query');
const createMock = jest.fn(),
  findAllMock = jest.fn(),
  getProductByIdMock = jest.fn(),
  updateMock = jest.fn(),
  deleteMock = jest.fn();
ProductQuery.prototype.create = createMock;
ProductQuery.prototype.findAll = findAllMock;
ProductQuery.prototype.getProductById = getProductByIdMock;
ProductQuery.prototype.update = updateMock;
ProductQuery.prototype.removeById = deleteMock;

describe('src/product/domain/product.service.spec.ts', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module = await getAppModule();
    service = module.get<ProductService>(ProductService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a product', async () => {
      // Arrange
      const createProductDto: CreateProductDto = {
        name: 'product',
        price: 100,
        sku: 'sku',
      };

      createMock.mockResolvedValue({ id: 1, ...createProductDto });

      // Act
      const result = await service.create(createProductDto);

      // Assert
      expect(result).toBeDefined();
      // Add more assertions based on your expected behavior
    });
  });

  describe('findAll', () => {
    it('should return all products', async () => {
      // Arrange
      const expectedData = [
        { id: 1, name: 'product1', price: 100, sku: 'sku1' },
        { id: 2, name: 'product2', price: 200, sku: 'sku2' },
      ];
      const mockFindAll = findAllMock.mockResolvedValue(expectedData);

      // Act
      const result = await service.findAll();

      // Assert
      expect(mockFindAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedData);
    });
  });
  describe('findOne', () => {
    it('should return a product by id', async () => {
      // Arrange
      const id = 1;
      const expectedProduct = {
        id: 1,
        name: 'product',
        price: 100,
        sku: 'sku',
      };
      getProductByIdMock.mockResolvedValue(expectedProduct);

      // Act
      const result = await service.findOne(id);

      // Assert
      expect(result).toEqual(expectedProduct);
      expect(getProductByIdMock).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      // Arrange
      const id = 1;
      const updateProductDto: UpdateProductDto = {
        name: 'updated product',
        price: 200,
        sku: 'updated sku',
      };
      updateMock.mockResolvedValue(true);

      // Act
      const result = await service.update(id, updateProductDto);

      // Assert
      expect(updateMock).toHaveBeenCalledWith(id, updateProductDto);
      expect(result).toBe(true);
    });
  });

  describe('remove', () => {
    it('should remove a product by id', async () => {
      // Arrange
      const id = 1;
      deleteMock.mockResolvedValue({ id });

      // Act
      const result = await service.remove(id);

      // Assert
      expect(deleteMock).toHaveBeenCalledWith(id);
      expect(result).toEqual({ id });
    });
  });
});
