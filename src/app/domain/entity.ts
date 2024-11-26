import { UUIDGenerator } from '../utils/uuid-generator';

export abstract class Entity<T> {
  protected _id: string;
  protected _props: T;
  createdAt: number;
  updatedAt: number;

  constructor(props: T) {
    this._id = UUIDGenerator.create();
    this._props = props;
  }

  get id(): string {
    return this._id;
  }

  get props(): T {
    return this._props;
  }

  update(props: Partial<T>): void {
    this._props = { ...this._props, ...props };
  }

  toPrimitive() {
    return this.props;
  }
}
