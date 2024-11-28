export class ProductInventoryChangedEvent {
  constructor(
    public productId: string,
    public userId: string,
    public quantity: number,
  ) {}
}
