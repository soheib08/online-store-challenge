import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProductInventoryHistoryDocument } from './schema/product-inventory-history.schema';
import { ProductInventoryHistory } from '../domain/entity/product-inventory-history';
import { IProductInventoryHistoryRepository } from '../domain/repository/product-inventory-history.repository';

@Injectable()
export class ProductInventoryHistoryRepositoryMongo
  implements IProductInventoryHistoryRepository
{
  constructor(
    @InjectModel(ProductInventoryHistory.name)
    private model: Model<ProductInventoryHistoryDocument>,
  ) {}

  async create(entity: ProductInventoryHistory): Promise<boolean> {
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
  async getByProduct(
    productId: string,
  ): Promise<Array<ProductInventoryHistory>> {
    try {
      const list = await this.model.find({ productId });

      const items = list.map((e) => ProductInventoryHistory.fromPrimitive(e));

      return items;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
