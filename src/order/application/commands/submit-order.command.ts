import {
  BadRequestException,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Order } from 'src/order/domain/order';
import { IOrderRepository } from 'src/order/domain/order-repository';
import { Product } from 'src/product/domain/product';
import { IProductRepository } from 'src/product/domain/product-repository';
import { GetProductService } from 'src/product/services/get-product.service';

export class SubmitOrderCommand {
  productId: string;
  count: number;
  userId: string;

  constructor(args: SubmitOrderCommand) {
    this.productId = args.productId;
    this.count = args.count;
    this.userId = args.userId;
  }
}

@CommandHandler(SubmitOrderCommand)
export class SubmitOrderCommandHandler
  implements ICommandHandler<SubmitOrderCommand>
{
  constructor(
    private readonly getProductService: GetProductService,
    @Inject(IOrderRepository) private orderRepo: IOrderRepository,
    private eventBus: EventBus,
  ) {}

  async execute({
    userId,
    productId,
    count,
  }: SubmitOrderCommand): Promise<void> {
    const foundProduct = await this.getProductService.execute(productId);

    if (!foundProduct.isProductCanBePurchased())
      throw new BadRequestException('product is not available');

    if (!foundProduct.isProductCanBePurchased())
      throw new BadRequestException('requested count is more than quantity');

    const order = Order.New({
      count,
      productId,
      userId,
      productPrice: foundProduct.price,
    });

    order.calculatePrice();
    let orderCreatedStatus = await this.orderRepo.create(order);

    if (!orderCreatedStatus)
      throw new InternalServerErrorException('order is not created');
  }
}
