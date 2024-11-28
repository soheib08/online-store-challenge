import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SubmitOrderCommand } from '../application/commands/submit-order.command';
import { SubmitOrderRequest } from './dto/submit-order.dto';
import { CurrentUser } from 'src/app/middlewares/user.decorator';
import { UserOrdersQuery } from '../application/queries/user-orders.query';

@Controller()
export class OrderController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('products/purchase')
  async submitOrder(
    @Body() { count, productId }: SubmitOrderRequest,
    @CurrentUser() userId: string,
  ): Promise<void> {
    await this.commandBus.execute(
      new SubmitOrderCommand({ count, productId, userId }),
    );
  }

  @Get('user/orders')
  async getUserOrders(@CurrentUser() userId: string): Promise<void> {
    await this.queryBus.execute(new UserOrdersQuery(userId));
  }
}
