import { Module } from '@nestjs/common';
import { ProductService } from './domain/product.service';
import { ProductController } from './application/rest/product.controller';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
