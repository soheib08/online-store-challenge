import { Injectable } from '@nestjs/common';
import { ClientSession, Connection, Model } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { OrderDocument } from './schema/order.schema';
import { Order } from '../domain/order';
import { IOrderRepository } from '../domain/order-repository';
import { MongooseTransactionExecuter } from 'src/app/services/transaction-executer';

@Injectable()
export class OrderRepositoryMongo
  extends MongooseTransactionExecuter
  implements IOrderRepository
{
  constructor(
    @InjectModel(Order.name)
    private model: Model<OrderDocument>,
    @InjectConnection() connection: Connection,
  ) {
    super(connection);
  }

  async create(entity: Order, session?: ClientSession): Promise<boolean> {
    try {
      const { id, ...rest } = entity.toPrimitive();

      await new this.model({
        _id: id,
        ...rest,
      }).save({ session });
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
  async find(): Promise<{ items: Order[]; count: number }> {
    try {
      const foundOrders = await this.model.find({});
      const items = foundOrders.map((e) => Order.fromPrimitive(e));

      return { items, count: items.length };
    } catch (err) {
      console.error(err);
      return { items: [], count: 0 };
    }
  }

  async findById(id: string): Promise<Order> {
    try {
      const found = await this.model.findOne({
        _id: id,
        deletedAt: { $exists: false },
      });
      if (!!found) {
        return Order.fromPrimitive(found.toObject({ virtuals: true }));
      } else {
        return null;
      }
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async update(entity: Order): Promise<boolean> {
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

  async getByUser(userId: string): Promise<Array<Order>> {
    try {
      const result = await this.model.find({ userId });

      return result.map((e) => {
        return Order.fromPrimitive(e.toObject({ virtuals: true }));
      });
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
