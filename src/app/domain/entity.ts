import { UUIDGenerator } from '../utils/uuid-generator';

export abstract class Entity<T> {
  private _id: string;
  private _props: T;
  createdAt: Date;
  updatedAt: Date;

  constructor(entityProps: T) {
    this._id = UUIDGenerator.create();
    this._props = entityProps;
  }

  get id(): string {
    return this._id;
  }

  get props(): T {
    return this._props;
  }

  protected updateEntity(props: Partial<T>): void {
    this._props = { ...this._props, ...props };
  }

  toPrimitive() {
    return this.props;
  }
}
