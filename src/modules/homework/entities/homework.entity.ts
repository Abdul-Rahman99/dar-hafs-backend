import { AbstractEntity } from '../../../common/abstract.entity';
import { Student } from '../../../modules/students/entities/student.entity';
import { Teacher } from '../../../modules/teacher/entities/teacher.entity';
import { Entity, Column, ManyToOne } from 'typeorm';

@Entity('homeworks')
export class Homework extends AbstractEntity<Homework> {
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  details: string;

  @ManyToOne(() => Student, (student) => student.homeworks, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    eager: true,
  })
  student: Student;

  @ManyToOne(() => Teacher, (teacher) => teacher.homeworks, {
    onDelete: 'SET NULL',
    eager: true,
  })
  teacher: Teacher;

  @Column({
    type: 'enum',
    enum: ['Assigned', 'Submitted', 'Checked'],
    default: 'Assigned',
  })
  status: 'Assigned' | 'Submitted' | 'Checked';
}
