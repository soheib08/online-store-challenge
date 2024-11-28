import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ProductInventoryHistory } from '../domain/entity/product-inventory-history';
import { IProductInventoryHistoryRepository } from '../domain/repository/product-inventory-history.repository';
import { ProductInventoryChangedEvent } from 'src/product/domain/events/inventory-changed.event';

@EventsHandler(ProductInventoryChangedEvent)
export class ProductInventoryChangedEventHandler
  implements IEventHandler<ProductInventoryChangedEvent>
{
  constructor(
    @Inject(IProductInventoryHistoryRepository)
    private repo: IProductInventoryHistoryRepository,
  ) {}

  async handle({ productId, userId, quantity }: ProductInventoryChangedEvent) {
    await this.repo.create(
      ProductInventoryHistory.New({
        productId,
        userId,
        quantity,
      }),
    );
  }
}
