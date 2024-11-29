import { Entity } from 'src/app/domain/entity';
import { CategoryProps } from './category';
import { ProductDto } from '../dto/product.dto';
import { CategoryDto } from '../dto/category.dto';
import { ProductUpdateBuilder } from '../update-product-builder';

export type ProductProps = {
  id?: string;
  categoryId: string;
  category?: CategoryProps;
  title: string;
  description: string;
  price: number;
  quantity: number;
  image?: string;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

export type AddProductInp = Omit<
  ProductProps,
  'updatedAt' | 'createdAt' | 'id'
>;

export class Product extends Entity<ProductProps> {
  private constructor(props: ProductProps) {
    super(props);
  }

  static New(inp: AddProductInp): Product {
    return new Product({ ...inp });
  }

  static fromPrimitive(prim: ProductProps) {
    return new Product({ ...prim });
  }

  toDto() {
    return new ProductDto(this);
  }

  //getters
  get title() {
    return this.props.title;
  }

  get description() {
    return this.props.description;
  }

  get price() {
    return this.props.price;
  }

  get quantity() {
    return this.props.quantity;
  }

  get image() {
    return this.props.image;
  }

  get category(): CategoryDto {
    return { id: this.props.category?.id, title: this.props.category?.title };
  }

  //logics
  update({
    title,
    description,
    price,
    quantity,
    image,
  }: Partial<ProductProps>) {
    const updateDto: Partial<ProductProps> = new ProductUpdateBuilder()
      .setName(title)
      .setDescription(description)
      .setPrice(price)
      .setQuantity(quantity)
      .setImage(image)
      .build();

    this.updateEntity(updateDto);
  }

  isProductCanBePurchased(): boolean {
    if (this.props.quantity > 0) return true;
    else return false;
  }

  isQuantityAvailable(count: number): boolean {
    if (count > this.props.quantity) return false;
    else return true;
  }
}
