import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IProductActionHistoryRepository } from 'src/product-history/domain/repository/product-action-history.repository';
import { IProductInventoryHistoryRepository } from 'src/product-history/domain/repository/product-inventory-history.repository';
import { IProductPriceHistoryRepository } from 'src/product-history/domain/repository/product-price-history.repository';
import { ProductDisplayDto } from 'src/product/api/dto/display-product.dto';
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
    @Inject(IProductActionHistoryRepository)
    private readonly actionRepo: IProductActionHistoryRepository,
    @Inject(IProductPriceHistoryRepository)
    private readonly priceRepo: IProductPriceHistoryRepository,
    @Inject(IProductInventoryHistoryRepository)
    private readonly inventoryRepo: IProductInventoryHistoryRepository,
  ) {}

  async execute({ id }: ProductDisplayQuery): Promise<ProductDisplayDto> {
    const foundProduct = await this.repo.findOneWithCategoryData(id);
    if (!foundProduct) throw new NotFoundException('product not found');

    const actionHistory = await this.actionRepo.getByProduct(foundProduct.id);
    const priceHistory = await this.priceRepo.getByProduct(foundProduct.id);
    const inventoryHistory = await this.inventoryRepo.getByProduct(
      foundProduct.id,
    );

    let res = new ProductDisplayDto(
      foundProduct.toDto(),
      priceHistory.map((e) => {
        return { date: e.createdAt, value: e.price };
      }),
      inventoryHistory.map((e) => {
        return { date: e.createdAt, value: e.quantity };
      }),
      actionHistory.map((e) => {
        return { action: e.action, date: e.createdAt, userId: e.userId };
      }),
    );
    return res;
  }
}
