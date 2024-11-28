import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProductActionHistoryDocument } from './schema/product-action-history.schema';
import { IProductActionHistoryRepository } from '../domain/repository/product-action-history.repository';
import { ProductActionHistory } from '../domain/entity/product-action-history';

@Injectable()
export class ProductActionHistoryRepositoryMongo
  implements IProductActionHistoryRepository
{
  constructor(
    @InjectModel(ProductActionHistory.name)
    private model: Model<ProductActionHistoryDocument>,
  ) {}

  async create(entity: ProductActionHistory): Promise<boolean> {
    try {
      const { id, ...rest } = entity.toPrimitive();

      await new this.model({
        _id: id,
        ...rest,
      }).save();
      return true;
    } catch (error) {
      console.error({ error });
      return false;
    }
  }

  async getByProduct(productId: string): Promise<Array<ProductActionHistory>> {
    try {
      const list = await this.model.find({ productId });

      const items = list.map((e) =>
        ProductActionHistory.fromPrimitive(e.toObject({ virtuals: true })),
      );

      return items;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
