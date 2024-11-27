import { Injectable } from '@nestjs/common';
import { IProductRepository } from '../domain/product-repository';
import { Product } from '../domain/product';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDocument } from './schema/product.schema';

@Injectable()
export class ProductRepositoryMongo implements IProductRepository {
  constructor(
    @InjectModel(Product.name)
    private model: Model<ProductDocument>,
  ) {}

  async create(entity: Product): Promise<boolean> {
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
  async delete(id: string): Promise<boolean> {
    try {
      const result = await this.model.deleteOne({ _id: id });
      return Boolean(result.acknowledged);
    } catch (error) {
      console.log({ error });
      return false;
    }
  }
  async find(): Promise<{ items: Product[]; count: number }> {
    try {
      const foundProducts = await this.model.find({
        deletedAt: { $exists: false },
      });
      const items = foundProducts.map((e) => Product.fromPrimitive(e));

      return { items, count: items.length };
    } catch (err) {
      console.error(err);
      return { items: [], count: 0 };
    }
  }

  async findById(id: string): Promise<Product> {
    try {
      const found = await this.model.findOne({
        _id: id,
        deletedAt: { $exists: false },
      });
      if (!!found) {
        return Product.fromPrimitive(found.toObject({ virtuals: true }));
      } else {
        return null;
      }
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async update(entity: Product): Promise<boolean> {
    const { id, ...rest } = entity.toPrimitive();
    try {
      const result = await this.model.updateOne({ _id: id }, { $set: rest });
      if (result.matchedCount == 0) {
        return false;
      }
      return true;
    } catch (error) {
      console.error(error);
    }
    return false;
  }

  async softDelete(id: string): Promise<boolean> {
    try {
      const result = await this.model.updateOne(
        { _id: id },
        { $set: { deletedAt: new Date() } },
      );
      if (result.matchedCount == 0) {
        return false;
      }
      return true;
    } catch (error) {
      console.error(error);
    }
    return false;
  }
}
