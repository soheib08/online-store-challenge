import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProductDto } from 'src/product/domain/dto/product.dto';
import { IProductRepository } from 'src/product/domain/repository/product-repository';

export class ProductDisplayQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(ProductDisplayQuery)
export class ProductDisplayQueryHandler
  implements IQueryHandler<ProductDisplayQuery>
{
  constructor(
    @Inject(IProductRepository)
    private readonly repo: IProductRepository,
  ) {}

  async execute({ id }: ProductDisplayQuery): Promise<ProductDto> {
    let foundProduct = await this.repo.findOneWithCategoryData(id);
    if (!foundProduct) throw new NotFoundException('product not found');

    return foundProduct.toDto();
  }
}
