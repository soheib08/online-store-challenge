import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IProductRepository } from 'src/product/domain/product-repository';
import { ProductDto } from 'src/product/domain/product.dto';

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

  async execute(query: ProductDisplayQuery): Promise<ProductDto> {
    let foundProduct = await this.repo.findById(query.id);
    if (!foundProduct) throw new NotFoundException('product not found');

    return foundProduct.toDto();
  }
}
