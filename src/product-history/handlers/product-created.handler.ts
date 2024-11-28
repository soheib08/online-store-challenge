import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ProductCreatedEvent } from 'src/product/domain/events/product-created.event';
import { IProductActionHistoryRepository } from '../domain/repository/product-action-history.repository';
import { ProductActionHistory } from '../domain/entity/product-action-history';
import { ProductActionHistoryEnum } from '../domain/constants/product-action-history.enum';

@EventsHandler(ProductCreatedEvent)
export class ProductCreatedEventHandler
  implements IEventHandler<ProductCreatedEvent>
{
  constructor(
    @Inject(IProductActionHistoryRepository)
    private repo: IProductActionHistoryRepository,
  ) {}

  async handle({ productId, userId }: ProductCreatedEvent) {
    await this.repo.create(
      ProductActionHistory.New({
        productId,
        userId,
        action: ProductActionHistoryEnum.CREATE,
      }),
    );
  }
}
