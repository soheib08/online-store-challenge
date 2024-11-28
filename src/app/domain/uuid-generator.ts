export const IUuidGeneratorService = Symbol('IUuidGeneratorService');
export interface IUuidGeneratorService {
  create(): string;
}
