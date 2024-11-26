import { Inject, Injectable } from '@nestjs/common';
import { ICategoryRepository } from '../domain/category-repository';
import { CategoryDto } from '../domain/category.dto';

@Injectable()
export class CategorySeederService {
  constructor(
    @Inject(ICategoryRepository)
    private repo: ICategoryRepository,
  ) {}

  async getCategoryList(): Promise<Array<CategoryDto>> {
    const foundCategories = await this.repo.find();
    return foundCategories.items.map((e) => e.toDto());
  }
}
