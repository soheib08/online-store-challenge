import { Entity } from 'src/app/domain/entity';

export type ProductInventoryHistoryProps = {
  id?: string;
  userId: string;
  productId: string;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type AddProductInventoryHistoryInp = Omit<
  ProductInventoryHistoryProps,
  'updatedAt' | 'createdAt' | 'id'
>;

export class ProductInventoryHistory extends Entity<ProductInventoryHistoryProps> {
  private constructor(props: ProductInventoryHistoryProps) {
    super(props);
  }

  static New(inp: AddProductInventoryHistoryInp): ProductInventoryHistory {
    return new ProductInventoryHistory({ ...inp });
  }

  static fromPrimitive(prim: ProductInventoryHistoryProps) {
    return new ProductInventoryHistory({ ...prim });
  }

  get userId() {
    return this.props.userId;
  }

  get quantity() {
    return this.props.quantity;
  }
  get date() {
    return this.props.createdAt;
  }
}
