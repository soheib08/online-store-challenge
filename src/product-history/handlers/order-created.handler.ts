import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OrderCreatedEvent } from 'src/order/domain/events/order-created.event';
import { IProductActionHistoryRepository } from '../domain/repository/product-action-history.repository';
import { ProductActionHistory } from '../domain/entity/product-action-history';
import { ProductActionHistoryEnum } from '../domain/constants/product-action-history.enum';

@EventsHandler(OrderCreatedEvent)
export class OrderCreatedEventHandler
  implements IEventHandler<OrderCreatedEvent>
{
  constructor(
    @Inject(IProductActionHistoryRepository)
    private repo: IProductActionHistoryRepository,
  ) {}

  async handle({ productId, userId }: OrderCreatedEvent) {
    await this.repo.create(
      ProductActionHistory.New({
        productId,
        userId,
        action: ProductActionHistoryEnum.PURCHASE,
      }),
    );
  }
}
