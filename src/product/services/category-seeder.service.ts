import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { AddCategoryInp, Category } from '../domain/category';
import { ICategoryRepository } from '../domain/category-repository';

export const CategorySeedData: AddCategoryInp[] = [
  {
    title: 'Anime Accessories',
  },
  {
    title: 'Series Accessories',
  },
];

@Injectable()
export class CategorySeederService implements OnModuleInit {
  constructor(
    @Inject(ICategoryRepository)
    private repo: ICategoryRepository,
  ) {}

  onModuleInit() {
    this.seedData();
  }

  private seedData() {
    this.repo
      .find()
      .then((categories) => {
        if (!categories.count) {
          const categories = CategorySeedData.map((e) => Category.New(e));
          this.repo.insertMany(categories);
        }
      })
      .catch(console.error);
  }
}
