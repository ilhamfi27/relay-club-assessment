import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class AddToCartDto {
  @IsInt()
  @ApiProperty()
  productId: number;

  @IsInt()
  @Min(1)
  @ApiProperty()
  quantity: number;
}
