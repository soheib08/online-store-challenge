import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { CategoryListQuery } from '../queries/get-categories-list.query';
import { CategoryDto } from 'src/product/domain/category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async getCategoryList(): Promise<Array<CategoryDto>> {
    return await this.queryBus.execute(new CategoryListQuery());
  }
}
