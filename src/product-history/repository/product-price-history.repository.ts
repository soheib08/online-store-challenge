import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IProductPriceHistoryRepository } from '../domain/repository/product-price-history.repository';
import { ProductPriceHistory } from '../domain/entity/product-price-history';
import { ProductPriceHistoryDocument } from './schema/product-price-history.schema';

@Injectable()
export class ProductPriceHistoryRepositoryMongo
  implements IProductPriceHistoryRepository
{
  constructor(
    @InjectModel(ProductPriceHistory.name)
    private model: Model<ProductPriceHistoryDocument>,
  ) {}

  async create(entity: ProductPriceHistory): Promise<boolean> {
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

  async getByProduct(productId: string): Promise<Array<ProductPriceHistory>> {
    try {
      const list = await this.model.find({ productId });

      const items = list.map((e) => ProductPriceHistory.fromPrimitive(e));

      return items;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
