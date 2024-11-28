import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true, id: true })
export class ProductInventoryHistorySchema {
  id: string;

  @Prop({
    required: true,
  })
  userId: string;

  @Prop()
  productId: string;

  @Prop({
    required: true,
  })
  quantity: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export type ProductInventoryHistoryDocument =
  HydratedDocument<ProductInventoryHistorySchema>;
export const ProductInventoryHistorySchemaMongo = SchemaFactory.createForClass(
  ProductInventoryHistorySchema,
).set('versionKey', false);
