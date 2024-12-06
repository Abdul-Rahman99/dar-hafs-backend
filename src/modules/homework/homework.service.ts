import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Homework } from './entities/homework.entity';
import { Student } from '../students/entities/student.entity';
import { Teacher } from '../teacher/entities/teacher.entity';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { UpdateHomeworkDto } from './dto/update-homework.dto';

@Injectable()
export class HomeworksService {
  constructor(
    @InjectRepository(Homework)
    private readonly homeworksRepository: Repository<Homework>,
    @InjectRepository(Student)
    private readonly studentsRepository: Repository<Student>,
    @InjectRepository(Teacher)
    private readonly teachersRepository: Repository<Teacher>,
  ) {}

  async createHomework(dto: CreateHomeworkDto): Promise<Homework> {
    const student = await this.studentsRepository.findOne({
      where: { id: dto.studentId },
    });
    const teacher = await this.teachersRepository.findOne({
      where: { id: dto.teacherId },
    });

    if (!student) {
      throw new NotFoundException(`Student with ID ${dto.studentId} not found`);
    }
    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${dto.teacherId} not found`);
    }

    const homework = this.homeworksRepository.create({
      ...dto,
      student,
      teacher,
    });
    return this.homeworksRepository.save(homework);
  }

  async findAll(): Promise<Homework[]> {
    return this.homeworksRepository.find();
  }

  async findOne(id: number): Promise<Homework> {
    const homework = await this.homeworksRepository.findOne({ where: { id } });
    if (!homework) {
      throw new NotFoundException(`Homework with ID ${id} not found`);
    }
    return homework;
  }

  async updateHomework(id: number, dto: UpdateHomeworkDto): Promise<Homework> {
    const homework = await this.findOne(id);
    Object.assign(homework, dto);
    return this.homeworksRepository.save(homework);
  }

  async deleteHomework(id: number): Promise<void> {
    const result = await this.homeworksRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Homework with ID ${id} not found`);
    }
  }
}
