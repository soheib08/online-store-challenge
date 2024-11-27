import { EntityRepository } from 'src/app/domain/entity.repository';
import { Product } from './product';

export const IProductRepository = Symbol('IProductRepository');
export interface IProductRepository extends EntityRepository<Product> {
  softDelete(id: string): Promise<boolean>;
}
