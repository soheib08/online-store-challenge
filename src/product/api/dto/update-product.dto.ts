import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateProductRequest {
  @ApiProperty({ example: 'mug' })
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({ example: 'glass' })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ example: 300000, type: Number })
  @IsOptional()
  @IsNumber()
  price: number;

  @ApiProperty({ example: 40, type: Number })
  @IsOptional()
  @IsNumber()
  quantity: number;

  @ApiProperty({ example: '' })
  @IsOptional()
  @IsUrl()
  image?: string;
}
