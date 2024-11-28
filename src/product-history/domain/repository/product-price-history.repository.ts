import { ProductPriceHistory } from '../entity/product-price-history';

export const IProductPriceHistoryRepository = Symbol(
  'IProductPriceHistoryRepository',
);
export interface IProductPriceHistoryRepository {
  create(entity: ProductPriceHistory): Promise<boolean>;
  getByProduct(id: string): Promise<Array<ProductPriceHistory>>;
}
