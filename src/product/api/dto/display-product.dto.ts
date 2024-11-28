import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';
import { ProductActionHistoryEnum } from 'src/product-history/domain/constants/product-action-history.enum';
import { CategoryItemDto } from 'src/product/application/queries/get-categories-list.query';
import { ProductDto } from 'src/product/domain/dto/product.dto';

export class ProductPropertyHistoryDto {
  @ApiProperty({ example: new Date() })
  date: string;

  @ApiProperty({ example: 20 })
  value: string;
}

export class ProductActionHistoryDto {
  @ApiProperty({ example: new Date() })
  date: string;

  @ApiProperty({
    enum: ProductActionHistoryEnum,
    example: ProductActionHistoryEnum.CREATE,
  })
  action: ProductActionHistoryEnum;

  @ApiProperty({ example: '67486fc0bd77c40b2936da14' })
  userId: string;
}

export class ProductDisplayDto {
  @ApiProperty({ example: '67486fc0bd77c40b2936da14' })
  id: string;

  @ApiProperty({ example: 'mug' })
  title: string;

  @ApiProperty({ example: 'glass' })
  description: string;

  @ApiProperty({ example: 20000, type: Number })
  price: number;

  @ApiProperty({ example: 19, type: Number })
  quantity: number;

  @ApiProperty({ example: new Date(), type: Number })
  createdAt: Date;

  @ApiProperty({ type: CategoryItemDto })
  category: CategoryItemDto;

  @ApiProperty({ type: ProductPropertyHistoryDto, isArray: true })
  priceHistory: Array<ProductPropertyHistoryDto>;

  @ApiProperty({ type: ProductPropertyHistoryDto, isArray: true })
  inventoryHistory: Array<ProductPropertyHistoryDto>;

  @ApiProperty({ type: ProductActionHistoryDto, isArray: true })
  actionHistory: Array<ProductActionHistoryDto>;

  constructor(
    product: ProductDto,
    priceHistory: Array<ProductPropertyHistoryDto>,
    inventoryHistory: Array<ProductPropertyHistoryDto>,
    actionHistory: Array<ProductActionHistoryDto>,
  ) {
    this.id = product.id;
    this.title = product.title;
    this.description = product.description;
    this.category = product.category;
    this.price = product.price;
    this.quantity = product.quantity;
    this.createdAt = product.createdAt;
    this.inventoryHistory = inventoryHistory;
    this.priceHistory = priceHistory;
    this.actionHistory = actionHistory;
  }
}
