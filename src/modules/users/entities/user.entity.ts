import { Entity, Column, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../common/abstract.entity';
import { Student } from '../../../modules/students/entities/student.entity';
import { IsDate, MaxLength } from 'class-validator';
import { UserRole } from '../../../constants/enum/roles.enum';
import { Transform } from 'class-transformer';

@Entity('users')
export class User extends AbstractEntity<User> {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  @MaxLength(14)
  nationalId: string;

  @Column()
  address: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.PARENT,
  })
  role: string;

  @Column()
  @MaxLength(11)
  phoneNumber: string;

  @IsDate()
  @Transform(({ value }) => new Date(value)) // Transform plain date string to Date instance
  dateOfBirth: Date;

  @OneToMany(() => Student, (student) => student.parent)
  students: Student[];
}
