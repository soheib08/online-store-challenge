import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Category } from 'src/product/domain/entity/category';
import { CategoryDocument } from './category.schema';

@Schema({ timestamps: true, id: true })
export class ProductSchema {
  id: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Category.name })
  categoryId: string;
  category?: CategoryDocument;

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
  quantity: number;

  @Prop({
    required: true,
    type: Number,
  })
  price: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  deletedAt?: Date;
}

export type ProductDocument = HydratedDocument<ProductSchema>;
export const ProductSchemaMongo = SchemaFactory.createForClass(
  ProductSchema,
).set('versionKey', false);

ProductSchemaMongo.virtual('category', {
  ref: Category.name,
  localField: 'categoryId',
  foreignField: '_id',
  justOne: true,
});
