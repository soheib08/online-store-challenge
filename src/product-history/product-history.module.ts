import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from 'src/product/product.module';
import { ProductActionHistory } from './domain/entity/product-action-history';
import { ProductActionHistorySchemaMongo } from './repository/schema/product-action-history.schema';
import { CqrsModule } from '@nestjs/cqrs';
import { IProductActionHistoryRepository } from './domain/repository/product-action-history.repository';
import { ProductActionHistoryRepositoryMongo } from './repository/product-action-history.repository';
import { ProductPriceHistory } from './domain/entity/product-price-history';
import { ProductPriceHistorySchemaMongo } from './repository/schema/product-price-history.schema';
import { ProductInventoryHistory } from './domain/entity/product-inventory-history';
import { ProductInventoryHistorySchemaMongo } from './repository/schema/product-inventory-history.schema';
import { IProductPriceHistoryRepository } from './domain/repository/product-price-history.repository';
import { ProductPriceHistoryRepositoryMongo } from './repository/product-price-history.repository';
import { IProductInventoryHistoryRepository } from './domain/repository/product-inventory-history.repository';
import { ProductInventoryHistoryRepositoryMongo } from './repository/product-inventory-history.repository';
import { ProductInventoryChangedEventHandler } from './handlers/inventory-changed.handler';
import { PriceChangedEventHandler } from './handlers/price-changed.handler';
import { ProductCreatedEventHandler } from './handlers/product-created.handler';
import { ProductUpdatedEventHandler } from './handlers/product-updated.handler';
import { ProductDeletedEventHandler } from './handlers/product-deleted.handler';

export const eventHandlers = [
  ProductInventoryChangedEventHandler,
  PriceChangedEventHandler,
  ProductCreatedEventHandler,
  ProductUpdatedEventHandler,
  ProductDeletedEventHandler,
];
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ProductActionHistory.name,
        schema: ProductActionHistorySchemaMongo,
      },
      {
        name: ProductPriceHistory.name,
        schema: ProductPriceHistorySchemaMongo,
      },
      {
        name: ProductInventoryHistory.name,
        schema: ProductInventoryHistorySchemaMongo,
      },
    ]),
    CqrsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: IProductActionHistoryRepository,
      useClass: ProductActionHistoryRepositoryMongo,
    },
    {
      provide: IProductPriceHistoryRepository,
      useClass: ProductPriceHistoryRepositoryMongo,
    },
    {
      provide: IProductInventoryHistoryRepository,
      useClass: ProductInventoryHistoryRepositoryMongo,
    },
    ...eventHandlers,
  ],
  exports: [
    IProductInventoryHistoryRepository,
    IProductPriceHistoryRepository,
    IProductActionHistoryRepository,
  ],
})
export class ProductHistoryModule {}
