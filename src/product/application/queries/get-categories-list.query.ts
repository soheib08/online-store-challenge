import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { CategoryDto } from 'src/product/domain/dto/category.dto';
import { IProductRepository } from 'src/product/domain/repository/product-repository';
import { GetCategoryListService } from 'src/product/services/get-category-list.service';

export class CategoryListQuery {
  constructor() {}
}

export class CategoryItemDto {
  @ApiProperty({ example: '67486fc0bd77c40b2936da14' })
  id: string;

  @ApiProperty()
  title: string;
}

@QueryHandler(CategoryListQuery)
export class CategoryListQueryHandler
  implements IQueryHandler<CategoryListQuery>
{
  constructor(private readonly categoryListService: GetCategoryListService) {}

  async execute({}: CategoryListQuery): Promise<Array<CategoryDto>> {
    return await this.categoryListService.getCategoryList();
  }
}
