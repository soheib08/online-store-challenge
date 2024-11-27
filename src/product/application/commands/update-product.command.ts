import {
  Inject,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IProductRepository } from 'src/product/domain/product-repository';

export class UpdateProductCommand {
  id: string;
  title?: string;
  description?: string;
  price?: number;
  quantity?: number;
  image?: string;

  constructor(args: UpdateProductCommand) {
    this.id = args.id;
    this.title = args.title;
    this.description = args.description;
    this.price = args.price;
    this.quantity = args.quantity;
    this.image = args.image;
  }
}

@CommandHandler(UpdateProductCommand)
export class CreateProductCommandHandler
  implements ICommandHandler<UpdateProductCommand>
{
  constructor(
    @Inject(IProductRepository)
    private readonly repo: IProductRepository,
  ) {}

  async execute({
    id,
    description,
    title,
    price,
    quantity,
    image,
  }: UpdateProductCommand): Promise<void> {
    const foundProduct = await this.repo.findById(id);
    if (!foundProduct) throw new NotFoundException('product not found');

    foundProduct.update({ description, title, price, quantity, image });

    const result = await this.repo.update(foundProduct);
    if (!result)
      throw new InternalServerErrorException('error in updating product');
  }
}
