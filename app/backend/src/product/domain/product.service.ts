import { Injectable } from '@nestjs/common';
import {
  CreateProductDto,
  UpdateProductDto,
} from '../application/rest/product.request';
import { ProductQuery } from '../infrastructure/db/product.query';

@Injectable()
export class ProductService {
  constructor(private readonly productQuery: ProductQuery) {}
  async create(createProductDto: CreateProductDto) {
    return this.productQuery.create(createProductDto);
  }

  async findAll() {
    return this.productQuery.findAll();
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
