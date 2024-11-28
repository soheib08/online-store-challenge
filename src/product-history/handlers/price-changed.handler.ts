import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ProductPriceChangedEvent } from 'src/product/domain/events/price-changed.event';
import { ProductPriceHistory } from '../domain/entity/product-price-history';
import { IProductPriceHistoryRepository } from '../domain/repository/product-price-history.repository';

@EventsHandler(ProductPriceChangedEvent)
export class PriceChangedEventHandler
  implements IEventHandler<ProductPriceChangedEvent>
{
  constructor(
    @Inject(IProductPriceHistoryRepository)
    private repo: IProductPriceHistoryRepository,
  ) {}

  async handle({ productId, userId, price }: ProductPriceChangedEvent) {
    await this.repo.create(
      ProductPriceHistory.New({
        productId,
        userId,
        price,
      }),
    );
  }
}
