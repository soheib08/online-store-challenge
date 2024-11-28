export class ProductDeletedEvent {
  constructor(
    public productId: string,
    public userId: string,
  ) {}
}
