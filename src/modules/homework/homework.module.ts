import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Homework } from './entities/homework.entity';
import { Student } from '../students/entities/student.entity';
import { Teacher } from '../teacher/entities/teacher.entity';
import { HomeworksController } from './homework.controller';
import { HomeworksService } from './homework.service';

@Module({
  imports: [TypeOrmModule.forFeature([Homework, Student, Teacher])],
  controllers: [HomeworksController],
  providers: [HomeworksService],
})
export class HomeworksModule {}
