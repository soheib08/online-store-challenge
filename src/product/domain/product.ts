import { Entity } from 'src/app/domain/entity';

export type ProductProps = {
  id?: string;
  categoryId: string;
  title: string;
  description: string;
  price: number;
  image?: string;
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
}
