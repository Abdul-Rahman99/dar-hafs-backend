import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const AppDataSource = new DataSource({
  type: 'postgres', // or your database type
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'dar_hafs',
  namingStrategy: new SnakeNamingStrategy(), // Optional: Use snake_case column names
  synchronize: false, // Disable auto-sync; migrations will handle schema changes
  entities: [__dirname + '/**/*.entity{.ts,.js}'], // Adjust based on your project structure
  migrations: [__dirname + '/database/migrations/*{.ts,.js}'], // Folder for migrations
});
