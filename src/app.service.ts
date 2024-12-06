import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(private readonly entityManager: EntityManager) {}

  async onApplicationBootstrap() {
    // Perform database operations here
  }
}
