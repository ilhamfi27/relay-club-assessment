import { Module } from '@nestjs/common';
import { ProductService } from './domain/product.service';
import { ProductController } from './application/rest/product.controller';
import { ProductQuery } from './infrastructure/db/product.query';

@Module({
  controllers: [ProductController],
  providers: [ProductService, ProductQuery],
})
export class ProductModule {}
