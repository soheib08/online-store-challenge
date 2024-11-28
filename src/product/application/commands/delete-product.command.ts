import { Inject, InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { IProductRepository } from 'src/product/domain/repository/product-repository';
import { ProductDeletedEvent } from '../../domain/events/product-deleted.event';

export class DeleteProductCommand {
  constructor(
    public productId: string,
    public userId: string,
  ) {}
}

@CommandHandler(DeleteProductCommand)
export class DeleteProductCommandHandler
  implements ICommandHandler<DeleteProductCommand>
{
  constructor(
    @Inject(IProductRepository)
    private readonly repo: IProductRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute({ productId, userId }: DeleteProductCommand): Promise<void> {
    const result = await this.repo.softDelete(productId);
    if (!result)
      throw new InternalServerErrorException('error in deleting product');

    this.eventBus.publish(new ProductDeletedEvent(productId, userId));
  }
}
