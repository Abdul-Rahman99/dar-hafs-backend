import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { Attendance } from '../attendance/entities/attendance.entity';
import { TeacherRepository } from './repositories/teacher.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher, Attendance])],
  controllers: [TeacherController],
  providers: [TeacherService, TeacherRepository],
  exports: [TypeOrmModule],
})
export class TeacherModule {}
