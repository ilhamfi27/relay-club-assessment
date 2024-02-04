import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductService } from '../../domain/product.service';
import { CreateProductDto, UpdateProductDto } from './product.request';

@ApiTags('Product')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiBearerAuth()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Put(':id')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
