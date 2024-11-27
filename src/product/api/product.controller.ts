import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ProductDto } from 'src/product/domain/product.dto';
import { ProductDisplayQuery } from '../application/queries/display-product.query';
import { UuidDto } from 'src/app/dto/uuid.dto';
import { CreateProductRequest } from './dto/create-product.dto';
import { CreateProductCommand } from '../application/commands/create-product.command';
import { DeleteProductCommand } from '../application/commands/delete-product.command';
import { UpdateProductRequest } from './dto/update-product.dto';
import { UpdateProductCommand } from '../application/commands/update-product.command';

@Controller()
export class ProductController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('')
  async getProductList(@Param() { id }: UuidDto): Promise<ProductDto> {
    return await this.queryBus.execute(new ProductDisplayQuery(id));
  }

  @Get(':id')
  async displayProduct(@Param() { id }: UuidDto): Promise<ProductDto> {
    return await this.queryBus.execute(new ProductDisplayQuery(id));
  }

  @Post()
  async createProduct(@Body() dto: CreateProductRequest) {
    await this.commandBus.execute(new CreateProductCommand(dto));
  }

  @Patch(':id')
  async updateProduct(
    @Param() { id }: UuidDto,
    @Body() dto: UpdateProductRequest,
  ) {
    await this.commandBus.execute(new UpdateProductCommand({ ...dto, id }));
  }

  @Delete(':id')
  async deleteProduct(@Param() { id }: UuidDto) {
    await this.commandBus.execute(new DeleteProductCommand(id));
  }
}
