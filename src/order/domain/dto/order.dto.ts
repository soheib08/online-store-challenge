import { OrderProps } from '../order';

export class OrderDto {
  id: string;
  userId: string;
  productId: string;
  count: number;
  price: number;
  createdAt: Date;

  constructor(order: OrderProps) {
    this.id = order.id;
    this.userId = order.userId;
    this.productId = order.productId;
    this.count = order.count;
    this.price = order.finalPrice;
    this.createdAt = order.createdAt;
  }
}
