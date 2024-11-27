import { EntityRepository } from 'src/app/domain/entity.repository';
import { Order } from './order';
import {
  ITransactionExecuter,
  TransactionManager,
} from 'src/app/services/transaction-executer';

export const IOrderRepository = Symbol('IOrderRepository');
export interface IOrderRepository
  extends EntityRepository<Order>,
    ITransactionExecuter {
  getByUser(userId: string): Promise<Array<Order>>;
  create(entity: Order, transactionManager?: TransactionManager);
}
