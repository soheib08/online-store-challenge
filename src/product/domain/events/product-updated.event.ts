export class ProductUpdatedEvent {
  constructor(
    public productId: string,
    public userId: string,
  ) {}
}
