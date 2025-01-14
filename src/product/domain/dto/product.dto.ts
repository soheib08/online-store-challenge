import { CategoryDto } from './category.dto';

export class ProductDto {
  id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  createdAt: Date;
  category: CategoryDto;

  constructor(product: ProductDto) {
    this.id = product.id;
    this.title = product.title;
    this.description = product.description;
    this.category = product.category;
    this.price = product.price;
    this.quantity = product.quantity;
    this.createdAt = product.createdAt;
  }
}
