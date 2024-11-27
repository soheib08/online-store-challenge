import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { OrderStatusEnum } from 'src/order/domain/constants/order-status.enum';
import { Product } from 'src/product/domain/product';

@Schema({ timestamps: true, id: true })
export class OrderSchema {
  id: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Product.name })
  productId: string;

  @Prop()
  userId: string;

  @Prop()
  count: number;

  @Prop()
  productPrice: number;

  @Prop()
  finalPrice: number;

  @Prop({ enum: OrderStatusEnum })
  status: OrderStatusEnum;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export type OrderDocument = HydratedDocument<OrderSchema>;
export const OrderSchemaMongo = SchemaFactory.createForClass(OrderSchema).set(
  'versionKey',
  false,
);
