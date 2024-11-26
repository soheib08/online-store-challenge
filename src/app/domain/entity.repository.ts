export interface EntityRepository<T> {
  create(entity: T): Promise<boolean>;
  update(entity: T): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  findById(id: string): Promise<T | null>;
  find(query?: EntityQuery): Promise<{ items: T[]; count: number }>;
}

export type EntityQuery = {
  page?: number;
  limit?: number;
};
