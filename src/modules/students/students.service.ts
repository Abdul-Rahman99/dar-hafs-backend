import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { User } from '../users/entities/user.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentsRepository: Repository<Student>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  // Create a new student
  async createStudent(dto: CreateStudentDto): Promise<Student> {
    const parent = await this.usersRepository.findOne({
      where: { id: dto.parentId },
    });
    if (!parent) {
      throw new NotFoundException(`Parent with ID ${dto.parentId} not found`);
    }

    const student = this.studentsRepository.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      dateOfBirth: dto.dateOfBirth,
      gradeLevel: dto.gradeLevel,
      parent,
    });

    return this.studentsRepository.save(student);
  }

  // Get all students with their relationships
  async findAll(): Promise<Student[]> {
    return this.studentsRepository.find({
      relations: ['parent', 'grades', 'attendance', 'financials', 'homeworks'],
    });
  }

  // Get a specific student by ID with relationships
  async findOne(id: number): Promise<Student> {
    const student = await this.studentsRepository.findOne({
      where: { id },
      relations: ['parent', 'grades', 'attendance', 'financials', 'homeworks'],
    });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
  }

  // Update an existing student
  async updateStudent(id: number, dto: UpdateStudentDto): Promise<Student> {
    const student = await this.findOne(id);

    if (dto.parentId) {
      const parent = await this.usersRepository.findOne({
        where: { id: dto.parentId },
      });
      if (!parent) {
        throw new NotFoundException(`Parent with ID ${dto.parentId} not found`);
      }
      student.parent = parent;
    }

    Object.assign(student, {
      firstName: dto.firstName ?? student.firstName,
      lastName: dto.lastName ?? student.lastName,
      dateOfBirth: dto.dateOfBirth ?? student.dateOfBirth,
      gradeLevel: dto.gradeLevel ?? student.gradeLevel,
    });

    return this.studentsRepository.save(student);
  }

  // Delete a student by ID
  async deleteStudent(id: number): Promise<void> {
    const result = await this.studentsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
  }
}
