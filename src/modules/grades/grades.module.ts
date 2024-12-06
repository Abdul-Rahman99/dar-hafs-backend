import { Module } from '@nestjs/common';
import { GradesService } from './grades.service';
import { GradesController } from './grades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grades } from './entities/grade.entity';
import { Student } from '../students/entities/student.entity';
import { Teacher } from '../teacher/entities/teacher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Grades, Student, Teacher])],
  controllers: [GradesController],
  providers: [GradesService],
})
export class GradesModule {}
