import {
  Inject,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { IProductRepository } from 'src/product/domain/repository/product-repository';
import { ProductUpdatedEvent } from '../../domain/events/product-updated.event';
import { ProductInventoryChangedEvent } from 'src/product/domain/events/inventory-changed.event';
import { ProductPriceChangedEvent } from 'src/product/domain/events/price-changed.event';
import { ProductProps } from 'src/product/domain/entity/product';
import { ProductUpdateBuilder } from 'src/product/domain/update-product-builder';

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
export class UpdateProductCommandHandler
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

    const inventoryChanged = this.isInventoryChanged(
      quantity,
      foundProduct.quantity,
    );
    const priceChanged = this.isPriceChanged(price, foundProduct.price);

    const updateDto: Partial<ProductProps> = new ProductUpdateBuilder()
      .setTitle(title)
      .setDescription(description)
      .setPrice(price)
      .setQuantity(quantity)
      .setImage(image)
      .build();

    foundProduct.update(updateDto);

    const result = await this.repo.update(foundProduct);
    if (!result)
      throw new InternalServerErrorException('error in updating product');

    this.eventBus.publish(new ProductUpdatedEvent(foundProduct.id, userId));

    if (inventoryChanged)
      this.eventBus.publish(
        new ProductInventoryChangedEvent(foundProduct.id, userId, quantity),
      );

    if (priceChanged)
      this.eventBus.publish(
        new ProductPriceChangedEvent(foundProduct.id, userId, price),
      );
  }

  private isPriceChanged(price: number, perviousValue: number) {
    return typeof price !== 'undefined' && price !== perviousValue;
  }
  private isInventoryChanged(quantity: number, perviousValue: number): boolean {
    return typeof quantity !== 'undefined' && quantity !== perviousValue;
  }
}
