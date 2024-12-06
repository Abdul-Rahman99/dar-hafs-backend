import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
export class TransactionManagerService {
  constructor(private readonly dataSources: DataSource) {}

  async startTransaction(): Promise<EntityManager> {
    const queryRunner = this.dataSources.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    return queryRunner.manager;
  }

  async commitTransaction(manager: EntityManager): Promise<void> {
    await manager.queryRunner.commitTransaction();
  }

  async rollbackTransaction(manager: EntityManager): Promise<void> {
    await manager.queryRunner.rollbackTransaction();
  }

  async releaseTransaction(manager: EntityManager): Promise<void> {
    await manager.queryRunner.release();
  }
}
