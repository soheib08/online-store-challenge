import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order } from './domain/order';
import { OrderSchemaMongo } from './repository/schema/order.schema';
import { CqrsModule } from '@nestjs/cqrs';
import { IOrderRepository } from './domain/order-repository';
import { OrderRepositoryMongo } from './repository/order-repository';
import { OrderController } from './api/order.contorller';
import { UserOrdersQueryHandler } from './application/queries/user-orders.query';
import { SubmitOrderCommandHandler } from './application/commands/submit-order.command';
import { ProductModule } from 'src/product/product.module';

export const queryHandlers = [UserOrdersQueryHandler];

export const commandHandlers = [SubmitOrderCommandHandler];
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchemaMongo,
      },
    ]),
    CqrsModule,
    ProductModule,
  ],
  controllers: [OrderController],
  providers: [
    {
      provide: IOrderRepository,
      useClass: OrderRepositoryMongo,
    },
    ...queryHandlers,
    ...commandHandlers,
  ],
})
export class OrderModule {}
