import { UUIDGenerator } from '../services/uuid-generator';

export abstract class Entity<T> {
  private _id: string;
  private _props: T;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    entityProps: T & { id?: string; createdAt?: Date; updatedAt?: Date },
  ) {
    this._id = entityProps.id ? entityProps.id : UUIDGenerator.create();
    this._props = entityProps;
    this.createdAt = entityProps.createdAt;
    this.updatedAt = entityProps.updatedAt;
  }

  get id(): string {
    return this._id;
  }

  protected get props(): T {
    return this._props;
  }

  protected updateEntity(props: Partial<T>): void {
    this._props = { ...this._props, ...props };
  }

  toPrimitive() {
    return this.props;
  }
}
