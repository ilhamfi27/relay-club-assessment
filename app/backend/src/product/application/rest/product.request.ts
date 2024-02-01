import { ApiProperty, OmitType } from '@nestjs/swagger';

class ProductDto {
  id: number;

  created_at: string;

  @ApiProperty()
  sku: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;
}

export class CreateProductDto extends OmitType(ProductDto, [
  'id',
  'created_at',
]) {}

export class UpdateProductDto extends OmitType(ProductDto, [
  'id',
  'created_at',
]) {}
