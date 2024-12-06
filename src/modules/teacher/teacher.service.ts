import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './entities/teacher.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {}

  create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    const teacher = this.teacherRepository.create(createTeacherDto);
    return this.teacherRepository.save(teacher);
  }

  findAll(): Promise<Teacher[]> {
    return this.teacherRepository.find({ relations: ['user'] });
  }

  findOne(id: number): Promise<Teacher> {
    return this.teacherRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async update(
    id: number,
    updateTeacherDto: UpdateTeacherDto,
  ): Promise<Teacher> {
    await this.teacherRepository.update(id, updateTeacherDto);
    return this.teacherRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.teacherRepository.delete(id);
  }
}
