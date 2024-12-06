import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { SharedModule } from './shared/shared.module';

import { ApiConfigService } from './shared/services/api-config.service';

import { AppController } from './app.controller';
import { UsersModule } from './modules/users/users.module';
import { TeacherModule } from './modules/teacher/teacher.module';
import { StudentsModule } from './modules/students/students.module';
import { GradesModule } from './modules/grades/grades.module';
import { FinancialsModule } from './modules/financials/financials.module';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { HomeworksModule } from './modules/homework/homework.module';

@Module({
  imports: [
    SharedModule,
    UsersModule,
    TeacherModule,
    StudentsModule,
    GradesModule,
    FinancialsModule,
    AttendanceModule,
    HomeworksModule,
    ConfigModule.forRoot({
      isGlobal: true, // Makes configuration globally available
      envFilePath: '.env', // Path to environment file
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ApiConfigService],
      useFactory: async (configService: ApiConfigService) =>
        await configService.getPostgresConfig(),
    }),
  ],
  controllers: [AppController],
  providers: [ApiConfigService],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private connection: Connection) {}

  async onApplicationBootstrap() {
    const entities = this.connection.entityMetadatas.map((meta) => meta.name);
    console.log('Loaded entities:', entities);
  }
}
