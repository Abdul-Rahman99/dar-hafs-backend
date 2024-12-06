import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';

import { AbstractEntity } from '../../../common/abstract.entity';
import { User } from '../../../modules/users/entities/user.entity';
import { Grades } from '../../../modules/grades/entities/grade.entity';
import { Attendance } from '../../../modules/attendance/entities/attendance.entity';
import { FinancialRecord } from '../../../modules/financials/entities/financial.entity';
import { Homework } from '../../../modules/homework/entities/homework.entity';

@Entity('students')
export class Student extends AbstractEntity<Student> {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  dateOfBirth: Date;

  @Column()
  gradeLevel: string;

  @ManyToOne(() => User, (user) => user.students)
  parent: User;

  @OneToMany(() => Grades, (grade) => grade.student)
  grades: Grades[];

  @OneToMany(() => Attendance, (attendance) => attendance.student)
  attendance: Attendance[];

  @OneToMany(() => FinancialRecord, (financial) => financial.student)
  financials: FinancialRecord[];

  @OneToMany(() => Homework, (homework) => homework.student)
  homeworks: Homework[];
}
