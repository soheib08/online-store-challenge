import { EntityRepository } from 'src/app/domain/entity.repository';
import { Product } from '../entity/product';
import { TransactionManager } from 'src/app/services/transaction-executer';

export const IProductRepository = Symbol('IProductRepository');
export interface IProductRepository extends EntityRepository<Product> {
  softDelete(id: string): Promise<boolean>;
  findByIdAndDecrementQuantity(
    productId: string,
    count: number,
    transactionManager?: TransactionManager,
  ): Promise<boolean>;
}
