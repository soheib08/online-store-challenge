import { Entity } from 'src/app/domain/entity';
import { ProductProps } from 'src/product/domain/entity/product';
import { OrderStatusEnum } from './constants/order-status.enum';
import { OrderProductDto } from './dto/order-product.dto';
import { OrderDto } from './dto/order.dto';

export type OrderProps = {
  id?: string;
  userId: string;
  productId: string;
  productPrice: number;
  count: number;
  product?: ProductProps;
  status: OrderStatusEnum;
  finalPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type AddOrderInp = Omit<
  OrderProps,
  'updatedAt' | 'createdAt' | 'id' | 'product' | 'status' | 'finalPrice'
>;

export class Order extends Entity<OrderProps> {
  private constructor(props: OrderProps) {
    super(props);
  }

  static New(inp: AddOrderInp): Order {
    return new Order({
      ...inp,
      status: OrderStatusEnum.PENDING,
      finalPrice: 0,
    });
  }

  static fromPrimitive(prim: OrderProps) {
    return new Order({ ...prim });
  }

  toDto(): OrderDto {
    return new OrderDto({ ...this.props });
  }

  //getters
  get user() {
    return this.props.userId;
  }

  get product(): OrderProductDto {
    const { id, title, price } = this.props.product;
    return new OrderProductDto(id, price, title);
  }

  get count() {
    return this.props.count;
  }

  get date() {
    return this.createdAt;
  }

  //logic
  calculatePrice() {
    this.props.finalPrice = this.count * this.props.productPrice;
  }
}
