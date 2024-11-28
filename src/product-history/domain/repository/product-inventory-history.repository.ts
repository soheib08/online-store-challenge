import { ProductInventoryHistory } from '../entity/product-inventory-history';

export const IProductInventoryHistoryRepository = Symbol(
  'IProductInventoryHistoryRepository',
);
export interface IProductInventoryHistoryRepository {
  create(entity: ProductInventoryHistory): Promise<boolean>;
  getByProduct(id: string): Promise<Array<ProductInventoryHistory>>;
}
