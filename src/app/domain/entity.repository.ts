export interface EntityRepository<T> {
  create(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<T | null>;
  find(query: EntityQuery): Promise<T[]>;
}

export type EntityQuery = {
  page?: number;
  limit?: number;
};
