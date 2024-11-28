import { Inject, Injectable } from '@nestjs/common';
import { ICategoryRepository } from '../domain/repository/category-repository';
import { CategoryDto } from '../domain/dto/category.dto';

@Injectable()
export class GetCategoryListService {
  constructor(
    @Inject(ICategoryRepository)
    private repo: ICategoryRepository,
  ) {}

  async getCategoryList(): Promise<Array<CategoryDto>> {
    const foundCategories = await this.repo.find();
    return foundCategories.items.map((e) => e.toDto());
  }
}
