import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CategoryDto } from 'src/product/domain/category.dto';
import { IProductRepository } from 'src/product/domain/product-repository';
import { GetCategoryListService } from 'src/product/services/get-category-list.service';

export class CategoryListQuery {
  constructor() {}
}

@QueryHandler(CategoryListQuery)
export class CategoryListQueryHandler
  implements IQueryHandler<CategoryListQuery>
{
  constructor(
    @Inject(IProductRepository)
    private readonly categoryListService: GetCategoryListService,
  ) {}

  async execute({}: CategoryListQuery): Promise<Array<CategoryDto>> {
    return await this.categoryListService.getCategoryList();
  }
}
