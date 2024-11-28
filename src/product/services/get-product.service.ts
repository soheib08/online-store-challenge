import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IProductRepository } from '../domain/repository/product-repository';
import { Product } from '../domain/entity/product';

@Injectable()
export class GetProductService {
  constructor(
    @Inject(IProductRepository)
    private repo: IProductRepository,
  ) {}

  async execute(productId: string): Promise<Product> {
    let foundProduct = await this.repo.findById(productId);
    if (!foundProduct) throw new NotFoundException('product not found');

    return foundProduct;
  }
}
