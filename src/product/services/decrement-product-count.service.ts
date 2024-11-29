import { Inject, Injectable } from '@nestjs/common';
import { IProductRepository } from '../domain/repository/product-repository';
import { TransactionManager } from 'src/app/services/transaction-executer';

@Injectable()
export class DecrementProductQuantityService {
  constructor(
    @Inject(IProductRepository)
    private repo: IProductRepository,
  ) {}

  async execute(
    productId: string,
    count: number,
    transactionManager?: TransactionManager,
  ): Promise<boolean> {
    let result = await this.repo.findByIdAndDecrementQuantity(
      productId,
      count,
      transactionManager,
    );

    if (!result) throw new Error('inventory update failed');

    return true;
  }
}
