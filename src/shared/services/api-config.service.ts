import { ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiConfigService {
  constructor(private readonly configService: ConfigService) {}

  async getPostgresConfig(): Promise<TypeOrmModuleOptions> {
    const host = this.configService.get<string>('DB_HOST');
    const port = this.configService.get<number>('DB_PORT');
    const password = this.configService.get<string>('DB_PASSWORD');
    const database = 'dar_hafs';

    if (!host || !port || !password || !database) {
      throw new Error('Database configuration is incomplete');
    }
    return {
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      type: 'postgres',
      host,
      port,
      username: 'postgres',
      password,
      database,
      autoLoadEntities: true,
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy(),
    };
  }

  get appConfig() {
    return {
      port: this.getNumber('PORT'),
      apiPrefix: this.getString('API_PREFIX'),
      apiVersion: this.getString('API_VERSION'),
    };
  }

  private getNumber(key: string): number {
    return this.configService.getOrThrow<number>(key);
  }

  private getString(key: string): string {
    return this.configService.getOrThrow<string>(key);
  }
}
