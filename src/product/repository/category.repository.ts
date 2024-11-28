import { Injectable } from '@nestjs/common';
import { ICategoryRepository } from '../domain/repository/category-repository';
import { Category } from '../domain/entity/category';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryDocument } from './schema/category.schema';

@Injectable()
export class CategoryRepositoryMongo implements ICategoryRepository {
  constructor(
    @InjectModel(Category.name)
    private model: Model<CategoryDocument>,
  ) {}

  async insertMany(entities: Category[]): Promise<boolean> {
    try {
      const categories = entities.map((e) => {
        return { ...e.toPrimitive(), _id: e.id };
      });

      await this.model.insertMany(categories);
      return true;
    } catch (error) {
      console.error({ error });
      return false;
    }
  }

  async create(entity: Category): Promise<boolean> {
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
  async find(): Promise<{ items: Category[]; count: number }> {
    try {
      const foundCategories = await this.model.find();
      const items = foundCategories.map((e) => Category.fromPrimitive(e));

      return { items, count: items.length };
    } catch (err) {
      console.error(err);
      return { items: [], count: 0 };
    }
  }

  async findById(id: string): Promise<Category> {
    try {
      const found = await this.model.findOne({ _id: id });
      if (!!found) {
        return Category.fromPrimitive(found.toObject({ virtuals: true }));
      } else {
        return null;
      }
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async update(entity: Category): Promise<boolean> {
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
}
