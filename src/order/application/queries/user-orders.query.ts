import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { OrderDto } from 'src/order/domain/dto/order.dto';
import { IOrderRepository } from 'src/order/domain/order-repository';

export class UserOrdersQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(UserOrdersQuery)
export class UserOrdersQueryHandler implements IQueryHandler<UserOrdersQuery> {
  constructor(
    @Inject(IOrderRepository)
    private readonly repo: IOrderRepository,
  ) {}

  async execute({ id }: UserOrdersQuery): Promise<Array<OrderDto>> {
    let list = await this.repo.getByUser(id);

    return list.map((e) => e.toDto());
  }
}
