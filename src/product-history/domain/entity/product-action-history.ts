import { Entity } from 'src/app/domain/entity';
import { ProductActionHistoryEnum } from '../constants/product-action-history.enum';

export type ProductActionHistoryProps = {
  id?: string;
  userId: string;
  productId: string;
  action: ProductActionHistoryEnum;
  createdAt?: Date;
  updatedAt?: Date;
};

export type AddProductActionHistoryInp = Omit<
  ProductActionHistoryProps,
  'updatedAt' | 'createdAt' | 'id'
>;

export class ProductActionHistory extends Entity<ProductActionHistoryProps> {
  private constructor(props: ProductActionHistoryProps) {
    super(props);
  }

  static New(inp: AddProductActionHistoryInp): ProductActionHistory {
    return new ProductActionHistory({ ...inp });
  }

  static fromPrimitive(prim: ProductActionHistoryProps) {
    return new ProductActionHistory({ ...prim });
  }

  get action() {
    return this.props.action;
  }

  get userId() {
    return this.props.userId;
  }

  get date() {
    return this.props.createdAt;
  }
}
