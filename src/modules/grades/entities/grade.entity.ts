import { Entity, Column, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../../common/abstract.entity';
import { Student } from '../../../modules/students/entities/student.entity';
import { Teacher } from '../../../modules/teacher/entities/teacher.entity';

@Entity('grades')
export class Grades extends AbstractEntity<Grades> {
  @ManyToOne(() => Student, (student) => student.grades)
  student: Student;

  @ManyToOne(() => Teacher, (teacher) => teacher.grades)
  teacher: Teacher;

  @Column()
  subject: string;

  @Column()
  grade: string;

  @Column()
  semester: string;
}
