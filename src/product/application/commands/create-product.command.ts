import { Inject, InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Product } from 'src/product/domain/product';
import { IProductRepository } from 'src/product/domain/product-repository';

export class CreateProductCommand {
  categoryId: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  image?: string;

  constructor(args: CreateProductCommand) {
    this.categoryId = args.categoryId;
    this.title = args.title;
    this.description = args.description;
    this.price = args.price;
    this.quantity = args.quantity;
    this.image = args.image;
  }
}

@CommandHandler(CreateProductCommand)
export class CreateProductCommandHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    @Inject(IProductRepository)
    private readonly repo: IProductRepository,
  ) {}

  async execute({
    categoryId,
    description,
    title,
    price,
    quantity,
    image,
  }: CreateProductCommand): Promise<void> {
    const productEntity = Product.New({
      categoryId,
      description,
      title,
      price,
      image,
      quantity,
    });

    const result = await this.repo.create(productEntity);
    if (!result)
      throw new InternalServerErrorException('error in adding product');
  }
}
