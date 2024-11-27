import { EntityRepository } from 'src/app/domain/entity.repository';
import { Order } from './order';

export const IOrderRepository = Symbol('IOrderRepository');
export interface IOrderRepository extends EntityRepository<Order> {
  getByUser(userId: string): Promise<Array<Order>>;
}
