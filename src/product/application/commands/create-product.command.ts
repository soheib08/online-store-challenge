import {
  Inject,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Product } from 'src/product/domain/entity/product';
import { IProductRepository } from 'src/product/domain/repository/product-repository';
import { ProductCreatedEvent } from '../../domain/events/product-created.event';
import { ICategoryRepository } from 'src/product/domain/repository/category-repository';

export class CreateProductCommand {
  categoryId: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  image?: string;
  userId: string;

  constructor(args: CreateProductCommand) {
    this.categoryId = args.categoryId;
    this.title = args.title;
    this.description = args.description;
    this.price = args.price;
    this.quantity = args.quantity;
    this.image = args.image;
    this.userId = args.userId;
  }
}

@CommandHandler(CreateProductCommand)
export class CreateProductCommandHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    @Inject(IProductRepository)
    private readonly repo: IProductRepository,
    @Inject(ICategoryRepository)
    private readonly categoryRepository: ICategoryRepository,

    private readonly eventBus: EventBus,
  ) {}

  async execute({
    categoryId,
    description,
    title,
    price,
    quantity,
    image,
    userId,
  }: CreateProductCommand): Promise<void> {
    const productEntity = Product.New({
      categoryId,
      description,
      title,
      price,
      image,
      quantity,
    });

    const foundCategory = await this.categoryRepository.findById(categoryId);
    if (!foundCategory) throw new NotFoundException('category not found');

    const result = await this.repo.create(productEntity);
    if (!result)
      throw new InternalServerErrorException('error in adding product');

    this.eventBus.publish(new ProductCreatedEvent(productEntity.id, userId));
  }
}
