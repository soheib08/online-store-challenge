import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ProductDeletedEvent } from 'src/product/domain/events/product-deleted.event';
import { IProductActionHistoryRepository } from '../domain/repository/product-action-history.repository';
import { Inject } from '@nestjs/common';
import { ProductActionHistory } from '../domain/entity/product-action-history';
import { ProductActionHistoryEnum } from '../domain/constants/product-action-history.enum';

@EventsHandler(ProductDeletedEvent)
export class ProductDeletedEventHandler
  implements IEventHandler<ProductDeletedEvent>
{
  constructor(
    @Inject(IProductActionHistoryRepository)
    private repo: IProductActionHistoryRepository,
  ) {}

  async handle({ productId, userId }: ProductDeletedEvent) {
    await this.repo.create(
      ProductActionHistory.New({
        productId,
        userId,
        action: ProductActionHistoryEnum.DELETE,
      }),
    );
  }
}
