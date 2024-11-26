export type ProductProps = {
  id: string;
  title: string;
  description: string;
  price: number;
  category_id: string;
  createdAt: number;
  updatedAt: number;
};

export type AddProductInp = Omit<
  ProductProps,
  'updatedAt' | 'createdAt' | 'id'
>;
