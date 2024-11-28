import { ProductActionHistory } from '../entity/product-action-history';

export const IProductActionHistoryRepository = Symbol(
  'IProductActionHistoryRepository',
);
export interface IProductActionHistoryRepository {
  create(entity: ProductActionHistory): Promise<boolean>;
  getByProduct(id: string): Promise<Array<ProductActionHistory>>;
}
