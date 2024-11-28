export class ProductCreatedEvent {
  constructor(
    public productId: string,
    public userId: string,
  ) {}
}
