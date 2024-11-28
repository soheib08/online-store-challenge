import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class SubmitOrderRequest {
  @ApiProperty({ example: '67486fc0bd77c40b2936da14' })
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ example: 3 })
  @IsNumber()
  @IsNotEmpty()
  count: number;
}
