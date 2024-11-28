import {
  Inject,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { IProductRepository } from 'src/product/domain/repository/product-repository';
import { ProductUpdatedEvent } from '../../domain/events/product-updated.event';

export class UpdateProductCommand {
  id: string;
  title?: string;
  description?: string;
  price?: number;
  quantity?: number;
  image?: string;
  userId: string;

  constructor(args: UpdateProductCommand) {
    this.id = args.id;
    this.title = args.title;
    this.description = args.description;
    this.price = args.price;
    this.quantity = args.quantity;
    this.image = args.image;
    this.userId = args.userId;
  }
}

@CommandHandler(UpdateProductCommand)
export class CreateProductCommandHandler
  implements ICommandHandler<UpdateProductCommand>
{
  constructor(
    @Inject(IProductRepository)
    private readonly repo: IProductRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute({
    id,
    description,
    title,
    price,
    quantity,
    image,
    userId,
  }: UpdateProductCommand): Promise<void> {
    const foundProduct = await this.repo.findById(id);
    if (!foundProduct) throw new NotFoundException('product not found');

    foundProduct.update({ description, title, price, quantity, image });

    const result = await this.repo.update(foundProduct);
    if (!result)
      throw new InternalServerErrorException('error in updating product');

    this.eventBus.publish(new ProductUpdatedEvent(foundProduct.id, userId));

    if (this.isInventoryChanged)
      this.eventBus.publish(new ProductUpdatedEvent(foundProduct.id, userId));

    if (this.isPriceChanged)
      this.eventBus.publish(new ProductUpdatedEvent(foundProduct.id, userId));
  }

  private isPriceChanged(price: number) {
    return typeof price !== 'undefined';
  }
  private isInventoryChanged(quantity: number): boolean {
    return typeof quantity !== 'undefined';
  }
}
