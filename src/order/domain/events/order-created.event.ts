export class OrderCreatedEvent {
  constructor(
    public productId: string,
    public userId: string,
  ) {}
}
