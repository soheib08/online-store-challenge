import { Inject, InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IProductRepository } from 'src/product/domain/product-repository';

export class DeleteProductCommand {
  constructor(public productId: string) {}
}

@CommandHandler(DeleteProductCommand)
export class DeleteProductCommandHandler
  implements ICommandHandler<DeleteProductCommand>
{
  constructor(
    @Inject(IProductRepository)
    private readonly repo: IProductRepository,
  ) {}

  async execute({ productId }: DeleteProductCommand): Promise<void> {
    const result = await this.repo.softDelete(productId);
    if (!result)
      throw new InternalServerErrorException('error in deleting product');
  }
}
