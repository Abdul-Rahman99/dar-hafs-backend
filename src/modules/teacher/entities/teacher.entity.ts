import { Entity, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../../../modules/users/entities/user.entity';
import { AbstractEntity } from '../../../common/abstract.entity';
import { Attendance } from '../../../modules/attendance/entities/attendance.entity';
import { Grades } from '../../../modules/grades/entities/grade.entity';
import { FinancialRecord } from '../../../modules/financials/entities/financial.entity';
import { Homework } from '../../../modules/homework/entities/homework.entity';

@Entity('teachers')
export class Teacher extends AbstractEntity<Teacher> {
  @OneToOne(() => User)
  @JoinColumn()
  user: number;

  @Column()
  subject: string;

  @Column()
  yearsOfExperience: number;

  @Column()
  salary: number;

  @OneToMany(() => Attendance, (attendance) => attendance.teacher)
  attendance: Attendance[];

  @OneToMany(() => Grades, (grade) => grade.teacher)
  grades: Grades[];

  @OneToMany(() => FinancialRecord, (record) => record.teacher)
  financials: FinancialRecord[];

  @OneToMany(() => Homework, (homework) => homework.teacher)
  homeworks: Homework[];
}
