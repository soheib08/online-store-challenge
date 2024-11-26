import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true, id: true })
export class CategorySchema {
  id: string;

  @Prop({
    required: true,
  })
  title: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export type CategoryDocument = HydratedDocument<CategorySchema>;
export const CategorySchemaMongo = SchemaFactory.createForClass(
  CategorySchema,
).set('versionKey', false);
