import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category } from './domain/entity/category';
import { CategorySchemaMongo } from './repository/schema/category.schema';
import { ICategoryRepository } from './domain/repository/category-repository';
import { CategoryRepositoryMongo } from './repository/category.repository';
import { Product } from './domain/entity/product';
import { ProductSchemaMongo } from './repository/schema/product.schema';
import { IProductRepository } from './domain/repository/product-repository';
import { ProductRepositoryMongo } from './repository/product.repository';
import { CreateProductCommandHandler } from './application/commands/create-product.command';
import { UpdateProductCommandHandler } from './application/commands/update-product.command';
import { DeleteProductCommandHandler } from './application/commands/delete-product.command';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductDisplayQueryHandler } from './application/queries/display-product.query';
import { CategoryListQueryHandler } from './application/queries/get-categories-list.query';
import { CategoryController } from './api/category.controller';
import { ProductController } from './api/product.controller';
import { CategorySeederService } from './services/category-seeder.service';
import { DecrementProductQuantityService } from './services/decrement-product-count.service';
import { GetProductService } from './services/get-product.service';
import { GetCategoryListService } from './services/get-category-list.service';
import { ProductListQueryHandler } from './application/queries/get-product-list.query';
import { ProductHistoryModule } from 'src/product-history/product-history.module';

export const queryHandlers = [
  ProductDisplayQueryHandler,
  CategoryListQueryHandler,
  ProductListQueryHandler,
];

export const commandHandlers = [
  CreateProductCommandHandler,
  UpdateProductCommandHandler,
  DeleteProductCommandHandler,
];

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchemaMongo,
      },
      {
        name: Product.name,
        schema: ProductSchemaMongo,
      },
    ]),
    CqrsModule,
    ProductHistoryModule,
  ],
  controllers: [CategoryController, ProductController],
  providers: [
    {
      provide: ICategoryRepository,
      useClass: CategoryRepositoryMongo,
    },
    {
      provide: IProductRepository,
      useClass: ProductRepositoryMongo,
    },
    CategorySeederService,
    DecrementProductQuantityService,
    GetProductService,
    GetCategoryListService,
    ...commandHandlers,
    ...queryHandlers,
  ],
  exports: [GetProductService, DecrementProductQuantityService],
})
export class ProductModule {}
