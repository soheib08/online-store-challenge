import { EntityRepository } from 'src/app/domain/entity.repository';
import { Category } from '../entity/category';

export const ICategoryRepository = Symbol('ICategoryRepository');
export interface ICategoryRepository extends EntityRepository<Category> {
  insertMany(entities: Category[]): Promise<boolean>;
}
