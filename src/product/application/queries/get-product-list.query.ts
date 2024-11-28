import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { ProductDto } from 'src/product/domain/dto/product.dto';
import { IProductRepository } from 'src/product/domain/repository/product-repository';

export class ProductListQuery {
  constructor() {}
}

export class ProductItemDto {
  @ApiProperty({ example: '67486fc0bd77c40b2936da14' })
  id: string;

  @ApiProperty()
  title: string;
}

@QueryHandler(ProductListQuery)
export class ProductListQueryHandler
  implements IQueryHandler<ProductListQuery>
{
  constructor(
    @Inject(IProductRepository)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute({}: ProductListQuery): Promise<Array<ProductDto>> {
    const list = await this.productRepository.find();

    return list.items.map((e) => e.toDto());
  }
}
