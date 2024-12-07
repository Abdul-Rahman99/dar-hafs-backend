import { Injectable } from '@nestjs/common';

import { Teacher } from './entities/teacher.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { TransactionManagerService } from '../../shared/services/transaction-manager.service';
import { ResponseHandler } from '../../helper/response.handler';
import { TeacherRepository } from './repositories/teacher.repository';

@Injectable()
export class TeacherService {
  constructor(
    private readonly teacherRepository: TeacherRepository,
    private readonly transactionManager: TransactionManagerService,
  ) {}

  async create(createTeacherDto: CreateTeacherDto): Promise<{ data: Teacher }> {
    const transactionManager = await this.transactionManager.startTransaction();
    try {
      // Check if the user already exists using userRepository
      const isUserExists = await this.teacherRepository.checkUniqueUserId(
        createTeacherDto.user,
      );

      if (isUserExists) {
        throw ResponseHandler.errorUnprocessableEntity(
          'Teacher Already Exists',
        );
      }

      const teacher = new Teacher(createTeacherDto);

      const createdTeacher = await transactionManager.save(teacher);

      await this.transactionManager.commitTransaction(transactionManager);
      return ResponseHandler.created<Teacher>(createdTeacher);
    } catch (error) {
      await this.transactionManager.rollbackTransaction(transactionManager);
      throw error;
    } finally {
      await this.transactionManager.releaseTransaction(transactionManager);
    }
  }

  async findAll(): Promise<{ data: { data: Teacher[] }; message: string }> {
    const users = await this.teacherRepository.find({ relations: ['user'] });
    return ResponseHandler.successArray(users, 'Teachers found successfully');
  }

  async findOne(id: number): Promise<{ data: Teacher; message: string }> {
    const teacher = await this.teacherRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!teacher) {
      throw ResponseHandler.errorBadRequest('Teacher not found');
    }
    return ResponseHandler.successObject<Teacher>(
      teacher,
      'Teacher found successfully',
    );
  }

  async update(
    id: number,
    updateTeacherDto: UpdateTeacherDto,
  ): Promise<{ data: Teacher; message: string }> {
    // Check if the user already exists using userRepository
    const isUserExists = await this.teacherRepository.checkUniqueUserId(
      updateTeacherDto.user,
    );

    if (isUserExists) {
      throw ResponseHandler.errorUnprocessableEntity('Teacher Already Exists');
    }
    await this.teacherRepository.update(id, updateTeacherDto);
    const updatedTeacher = await this.teacherRepository.findOne({
      where: { id },
    });
    return ResponseHandler.successObject<Teacher>(
      updatedTeacher,
      'Teacher updated successfully',
    );
  }

  async remove(id: number): Promise<void> {
    const result = await this.teacherRepository.delete(id);
    if (result.affected === 0) {
      return ResponseHandler.errorBadRequest('Teacher not found');
    }
  }
}
