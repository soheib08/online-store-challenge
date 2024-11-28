import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class SubmitOrderRequest {
  @ApiProperty({ example: 'uuid example' })
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ example: 3 })
  @IsNumber()
  @IsNotEmpty()
  count: number;
}
