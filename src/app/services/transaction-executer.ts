import {
  ClientSession,
  Connection,
  ClientSession as MongooseTransactionManager,
} from 'mongoose';

export type TransactionManager = MongooseTransactionManager;

export interface ITransactionExecuter {
  executeTransaction: <R>(
    callback: (transactionManager: TransactionManager) => R,
  ) => Promise<R>;
}

export class MongooseTransactionExecuter implements ITransactionExecuter {
  constructor(private readonly connection: Connection) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async executeTransaction<R>(
    callback: (transactionManager: ClientSession) => R,
  ) {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const result = await callback(session);
      if (result instanceof Error) throw result;
      await session.commitTransaction();
      await session.endSession();
      return result;
    } catch (err) {
      await session.abortTransaction();
      await session.endSession();
      if (err instanceof Error) return err as R;
      console.error(err);
      throw err;
    }
  }
}
