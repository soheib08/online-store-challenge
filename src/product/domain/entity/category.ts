import { Entity } from 'src/app/domain/entity';
import { CategoryDto } from '../dto/category.dto';

export type CategoryProps = {
  id?: string;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type AddCategoryInp = Omit<
  CategoryProps,
  'updatedAt' | 'createdAt' | 'id'
>;

export class Category extends Entity<CategoryProps> {
  private constructor(props: CategoryProps) {
    super(props);
  }

  static New(inp: AddCategoryInp): Category {
    return new Category({ ...inp });
  }

  static fromPrimitive(prim: CategoryProps) {
    return new Category({ ...prim });
  }

  toDto(): CategoryDto {
    return {
      id: this.props.id,
      title: this.props.title,
    };
  }
}
