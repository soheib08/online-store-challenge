import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { IUuidGeneratorService } from '../domain/uuid-generator';

@Injectable()
export class UUIDGenerator implements IUuidGeneratorService {
  create(): string {
    return new Types.ObjectId().toHexString();
  }

  static create(): string {
    return new Types.ObjectId().toHexString();
  }
}
