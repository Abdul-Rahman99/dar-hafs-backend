import { Entity, Column, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../../common/abstract.entity';
import { Student } from '../../../modules/students/entities/student.entity';
import { Teacher } from '../../../modules/teacher/entities/teacher.entity';

@Entity('financial_records')
export class FinancialRecord extends AbstractEntity<FinancialRecord> {
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'boolean', default: false })
  isPaid: boolean;

  @ManyToOne(() => Teacher, (teacher) => teacher.financials, {
    onDelete: 'CASCADE',
    eager: true,
  })
  teacher: Teacher;

  @ManyToOne(() => Student, (student) => student.financials, {
    onDelete: 'CASCADE',
    eager: true,
  })
  student: Student;
}
