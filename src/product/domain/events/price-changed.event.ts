export class ProductPriceChangedEvent {
  constructor(
    public productId: string,
    public userId: string,
    public price: number,
  ) {}
}
