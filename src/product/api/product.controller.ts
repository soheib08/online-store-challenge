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
import { ProductDisplayQuery } from '../application/queries/display-product.query';
import { ObjectIdDto } from 'src/app/dto/objectId.dto';
import { CreateProductRequest } from './dto/create-product.dto';
import { CreateProductCommand } from '../application/commands/create-product.command';
import { DeleteProductCommand } from '../application/commands/delete-product.command';
import { UpdateProductRequest } from './dto/update-product.dto';
import { UpdateProductCommand } from '../application/commands/update-product.command';
import { CurrentUser } from 'src/app/middlewares/user.decorator';
import { ProductDto } from '../domain/dto/product.dto';
import { ProductListQuery } from '../application/queries/get-product-list.query';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ProductDisplayDto } from './dto/display-product.dto';

@Controller('products')
export class ProductController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('')
  @ApiOperation({ summary: 'products list api' })
  @ApiOkResponse({ type: ProductDisplayDto, isArray: true })
  async getProductList(): Promise<Array<ProductDto>> {
    return await this.queryBus.execute(new ProductListQuery());
  }

  @Get('/:id')
  @ApiOperation({ summary: 'display product api' })
  async displayProduct(@Param() { id }: ObjectIdDto): Promise<ProductDto> {
    return await this.queryBus.execute(new ProductDisplayQuery(id));
  }

  @Post()
  @ApiOperation({ summary: 'create product api' })
  async createProduct(
    @Body() dto: CreateProductRequest,
    @CurrentUser() userId: string,
  ) {
    await this.commandBus.execute(new CreateProductCommand({ ...dto, userId }));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update product api' })
  async updateProduct(
    @Param() { id }: ObjectIdDto,
    @Body() dto: UpdateProductRequest,
    @CurrentUser() userId: string,
  ) {
    await this.commandBus.execute(
      new UpdateProductCommand({ ...dto, id, userId }),
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete product api' })
  async deleteProduct(
    @Param() { id }: ObjectIdDto,
    @CurrentUser() userId: string,
  ) {
    await this.commandBus.execute(new DeleteProductCommand(id, userId));
  }
}
