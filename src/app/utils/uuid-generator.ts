import { randomUUID } from 'crypto';

export class UUIDGenerator {
  static create() {
    return randomUUID();
  }
}
