import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true, id: true })
export class ProductPriceHistorySchema {
  id: string;

  @Prop()
  productId: string;

  @Prop({
    required: true,
  })
  userId: string;

  @Prop({
    required: true,
  })
  price: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export type ProductPriceHistoryDocument =
  HydratedDocument<ProductPriceHistorySchema>;
export const ProductPriceHistorySchemaMongo = SchemaFactory.createForClass(
  ProductPriceHistorySchema,
).set('versionKey', false);
