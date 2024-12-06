import { Entity, Column, ManyToOne } from 'typeorm';

import { AbstractEntity } from '../../../common/abstract.entity';
import { Teacher } from '../../../modules/teacher/entities/teacher.entity';
import { Student } from '../../../modules/students/entities/student.entity';

export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
}

@Entity('attendance')
export class Attendance extends AbstractEntity<Attendance> {
  @ManyToOne(() => Student, (student) => student.attendance)
  student: Student;

  @ManyToOne(() => Teacher, (teacher) => teacher.attendance)
  teacher: Teacher;

  @Column()
  date: Date;

  @Column({
    type: 'enum',
    enum: AttendanceStatus,
  })
  status: AttendanceStatus;
}
