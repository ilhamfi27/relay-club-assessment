import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class AddToCartDto {
  @IsInt()
  @ApiProperty()
  product_id: number;

  @IsInt()
  @Min(1)
  @ApiProperty()
  quantity: number;
}
