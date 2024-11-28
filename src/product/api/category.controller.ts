import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  CategoryItemDto,
  CategoryListQuery,
} from '../application/queries/get-categories-list.query';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('categories')
export class CategoryController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOkResponse({
    type: CategoryItemDto,
  })
  @HttpCode(HttpStatus.OK)
  async getCategoryList(): Promise<Array<CategoryItemDto>> {
    return await this.queryBus.execute(new CategoryListQuery());
  }
}
