import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SubmitOrderCommand } from '../application/commands/submit-order.command';
import { SubmitOrderRequest } from './dto/submit-order.dto';
import { CurrentUser } from 'src/app/middlewares/user.decorator';
import { UserOrdersQuery } from '../application/queries/user-orders.query';
import { ApiOperation } from '@nestjs/swagger';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('purchase')
  @ApiOperation({ summary: 'purchase product api' })
  async submitOrder(
    @Body() { count, productId }: SubmitOrderRequest,
    @CurrentUser() userId: string,
  ): Promise<void> {
    await this.commandBus.execute(
      new SubmitOrderCommand({ count, productId, userId }),
    );
  }

  @Get('')
  @ApiOperation({ summary: 'get user orders api' })
  async getUserOrders(@CurrentUser() userId: string): Promise<void> {
    return await this.queryBus.execute(new UserOrdersQuery(userId));
  }
}
