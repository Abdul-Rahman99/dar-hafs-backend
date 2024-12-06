import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AttendanceModule])],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AttendanceModule {}
