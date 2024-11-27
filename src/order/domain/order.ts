import { Entity } from 'src/app/domain/entity';
import { ProductProps } from 'src/product/domain/product';

export type OrderProps = {
  id?: string;
  productId: string;
  product?: ProductProps;
  title: string;
  description: string;
  price: number;
  quantity: number;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type AddOrderInp = Omit<OrderProps, 'updatedAt' | 'createdAt' | 'id'>;

export class Order extends Entity<OrderProps> {
  private constructor(props: OrderProps) {
    super(props);
  }

  static New(inp: AddOrderInp): Order {
    return new Order({ ...inp });
  }

  static fromPrimitive(prim: OrderProps) {
    return new Order({ ...prim });
  }
}
