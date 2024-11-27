import {
  BadRequestException,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { TransactionManager } from 'src/app/services/transaction-executer';
import { Order } from 'src/order/domain/order';
import { IOrderRepository } from 'src/order/domain/order-repository';
import { DecrementProductQuantityService } from 'src/product/services/decrement-product-count.service';
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
    private decrementProductQuantityService: DecrementProductQuantityService,
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

    const transactionCallback = async (
      transactionManager: TransactionManager,
    ): Promise<boolean> => {
      try {
        const orderCreatedStatus = await this.orderRepo.create(order);
        if (!orderCreatedStatus) throw new Error('order can not be created');

        await this.decrementProductQuantityService.execute(
          productId,
          count,
          transactionManager,
        );

        return true;
      } catch (err) {
        console.error(err);
        throw new Error('order can not be created');
      }
    };

    try {
      const createOrderResult =
        await this.orderRepo.executeTransaction(transactionCallback);

      if (!createOrderResult) throw new Error('create order failed');
    } catch (err) {
      throw new InternalServerErrorException('order is not submitted');
    }
  }
}
