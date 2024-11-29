import { Injectable } from '@nestjs/common';
import { IProductRepository } from '../domain/repository/product-repository';
import { Product } from '../domain/entity/product';
import { ClientSession, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDocument } from './schema/product.schema';
import { TransactionManager } from 'src/app/services/transaction-executer';
import { Category } from '../domain/entity/category';

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
      const foundProducts = await this.model
        .find({
          deletedAt: { $exists: false },
        })
        .populate({ path: 'category', model: Category.name })
        .sort({ createdAt: -1 });

      const items = foundProducts.map((e) =>
        Product.fromPrimitive(e.toObject({ virtuals: true })),
      );

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

  async findOneWithCategoryData(id: string): Promise<Product> {
    try {
      const found = await this.model
        .findOne({
          _id: id,
          deletedAt: { $exists: false },
        })
        .populate({ path: 'category', model: Category.name });

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

  async findByIdAndDecrementQuantity(
    productId: string,
    count: number,
    session?: ClientSession,
  ): Promise<boolean> {
    try {
      const updateResult = await this.model.findOneAndUpdate(
        { _id: productId, quantity: { $gte: count } },
        { $inc: { quantity: -count } },
        { session },
      );

      if (!updateResult) {
        throw new Error(
          'not enough products in stock or concurrent modifications.',
        );
      }
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
