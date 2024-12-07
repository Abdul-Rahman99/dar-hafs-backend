import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { User } from '../users/entities/user.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { TransactionManagerService } from '../../shared/services/transaction-manager.service';
import { ResponseHandler } from '../../helper/response.handler';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentsRepository: Repository<Student>,

    private readonly transactionManager: TransactionManagerService,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  // Create a new student
  async createStudent(
    createStudentDto: CreateStudentDto,
  ): Promise<{ data: Student }> {
    const transactionManager = await this.transactionManager.startTransaction();
    try {
      const { parentId, ...studentData } = createStudentDto;

      // Find the parent user by ID
      const parent = await this.usersRepository.findOne({
        where: { id: parentId },
      });

      // If parent doesn't exist, throw an error
      if (!parent) {
        throw new NotFoundException(`Parent with ID ${parentId} not found`);
      }

      // Create a new student entity and associate the parent
      const student = new Student(createStudentDto);
      student.firstName = studentData.firstName;
      student.lastName = studentData.lastName;
      student.dateOfBirth = studentData.dateOfBirth;
      student.gradeLevel = studentData.gradeLevel;

      // Associate the parent with the student
      student.parent = parent; // This is where the parent is set

      // Save the student using the transaction manager
      const createdStudent = await transactionManager.save(student);

      // Commit the transaction
      await this.transactionManager.commitTransaction(transactionManager);

      // Return the created student
      return ResponseHandler.created<Student>(createdStudent);
    } catch (error) {
      await this.transactionManager.rollbackTransaction(transactionManager);
      throw error;
    } finally {
      await this.transactionManager.releaseTransaction(transactionManager);
    }
  }

  // Get all students with their relationships
  async findAll(): Promise<{ data: { data: Student[] }; message: string }> {
    const students = await this.studentsRepository.find({
      relations: ['parent', 'grades', 'attendance', 'financials', 'homeworks'],
    });
    return ResponseHandler.successArray(
      students,
      'Students found successfully',
    );
  }

  // Get a specific student by ID with relationships
  async findOne(id: number): Promise<{ data: Student; message: string }> {
    const student = await this.studentsRepository.findOne({
      where: { id },
      relations: ['parent', 'grades', 'attendance', 'financials', 'homeworks'],
    });
    if (!student) {
      throw ResponseHandler.errorBadRequest('Student not found');
    }
    return ResponseHandler.successObject(student, 'Student found successfully');
  }

  // Update an existing student
  async updateStudent(
    id: number,
    updateStudentDto: UpdateStudentDto,
  ): Promise<{ data: Student; message: string }> {
    const transactionManager = await this.transactionManager.startTransaction();

    try {
      const partialEntity = { id, ...updateStudentDto };

      // Save the partial entity
      const updatedStudent = await transactionManager.save(
        Student,
        partialEntity,
      );

      await this.transactionManager.commitTransaction(transactionManager);

      return ResponseHandler.successObject(
        updatedStudent,
        'Student updated successfully',
      );
    } catch (error) {
      await this.transactionManager.rollbackTransaction(transactionManager);
      throw error;
    } finally {
      await this.transactionManager.releaseTransaction(transactionManager);
    }
  }

  async deleteStudent(id: number): Promise<void> {
    const result = await this.studentsRepository.delete(id);
    if (result.affected === 0) {
      return ResponseHandler.errorBadRequest('Student not found');
    }
  }
}
