import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ProductActionHistoryEnum } from 'src/product-history/domain/constants/product-action-history.enum';

@Schema({ timestamps: true, id: true })
export class ProductActionHistorySchema {
  id: string;

  @Prop({
    required: true,
    enum: ProductActionHistoryEnum,
  })
  action: ProductActionHistoryEnum;

  @Prop()
  productId: string;

  @Prop()
  userId: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export type ProductActionHistoryDocument =
  HydratedDocument<ProductActionHistorySchema>;
export const ProductActionHistorySchemaMongo = SchemaFactory.createForClass(
  ProductActionHistorySchema,
).set('versionKey', false);
