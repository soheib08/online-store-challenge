import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true, id: true })
export class ProductSchema {
  id: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Category' })
  categoryId: string;

  @Prop({
    required: true,
  })
  title: string;

  @Prop({
    required: true,
  })
  description: string;

  @Prop({
    required: false,
  })
  image: string;

  @Prop({
    required: true,
    type: Number,
  })
  price: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export type ProductDocument = HydratedDocument<ProductSchema>;
export const ProductSchemaMongo = SchemaFactory.createForClass(
  ProductSchema,
).set('versionKey', false);