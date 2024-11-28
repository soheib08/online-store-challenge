import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ProductUpdatedEvent } from 'src/product/domain/events/product-updated.event';
import { IProductActionHistoryRepository } from '../domain/repository/product-action-history.repository';
import { ProductActionHistory } from '../domain/entity/product-action-history';
import { ProductActionHistoryEnum } from '../domain/constants/product-action-history.enum';

@EventsHandler(ProductUpdatedEvent)
export class ProductUpdatedEventHandler
  implements IEventHandler<ProductUpdatedEvent>
{
  constructor(
    @Inject(IProductActionHistoryRepository)
    private repo: IProductActionHistoryRepository,
  ) {}

  async handle({ productId, userId }: ProductUpdatedEvent) {
    await this.repo.create(
      ProductActionHistory.New({
        productId,
        userId,
        action: ProductActionHistoryEnum.UPDATE,
      }),
    );
  }
}
