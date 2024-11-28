import { Entity } from 'src/app/domain/entity';

export type ProductPriceHistoryProps = {
  id?: string;
  userId: string;
  productId: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type AddProductPriceHistoryInp = Omit<
  ProductPriceHistoryProps,
  'updatedAt' | 'createdAt' | 'id'
>;

export class ProductPriceHistory extends Entity<ProductPriceHistoryProps> {
  private constructor(props: ProductPriceHistoryProps) {
    super(props);
  }

  static New(inp: AddProductPriceHistoryInp): ProductPriceHistory {
    return new ProductPriceHistory({ ...inp });
  }

  static fromPrimitive(prim: ProductPriceHistoryProps) {
    return new ProductPriceHistory({ ...prim });
  }
}
