import { ApiProperty } from '@nestjs/swagger';
import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateProductRequest {
  @ApiProperty({ example: 'mug' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'glass' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: '67486fc0bd77c40b2936da14' })
  @IsNotEmpty()
  @IsMongoId()
  categoryId: string;

  @ApiProperty({ example: 300000, type: Number })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ example: 40, type: Number })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({ example: '' })
  @IsOptional()
  @IsUrl()
  image?: string;
}
