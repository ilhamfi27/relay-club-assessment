import { Injectable } from '@nestjs/common';
import {
  CreateProductDto,
  UpdateProductDto,
} from '../application/rest/product.request';
import { ProductQuery } from '../infrastructure/db/product.query';
import { awaitToError } from '@/common/await-to-error';

@Injectable()
export class ProductService {
  constructor(private readonly productQuery: ProductQuery) {}
  async create(createProductDto: CreateProductDto) {
    const [, data] = await awaitToError(
      this.productQuery.create(createProductDto),
    );
    return data;
  }
  async findAll() {
    const [, data] = await awaitToError(this.productQuery.findAll());
    return data;
  }
  async findOne(id: number) {
    return this.productQuery.getProductById(id);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return this.productQuery.update(id, updateProductDto);
  }

  async remove(id: number) {
    await this.productQuery.removeById(id);
    return { id };
  }
}
