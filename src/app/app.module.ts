import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderModule } from 'src/order/order.module';
import { ProductModule } from 'src/product/product.module';
import { IUuidGeneratorService } from './domain/uuid-generator';
import { UUIDGenerator } from './services/uuid-generator';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { WrapResponseInterceptor } from './middlewares/wrap-response.interceptor';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL'),
      }),
      inject: [ConfigService],
      imports: [],
    }),
    CqrsModule.forRoot(),
    ProductModule,
    OrderModule,
  ],
  controllers: [],
  providers: [
    {
      provide: IUuidGeneratorService,
      useClass: UUIDGenerator,
    },
    { provide: APP_INTERCEPTOR, useClass: WrapResponseInterceptor },
  ],
})
export class AppModule {}
