import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from '../entities/teacher.entity';

@Injectable()
export class TeacherRepository extends Repository<Teacher> {
  constructor(
    @InjectRepository(Teacher)
    private readonly userRepository: Repository<Teacher>,
  ) {
    super(
      userRepository.target,
      userRepository.manager,
      userRepository.queryRunner,
    );
  }

  async checkUniqueUserId(id: number): Promise<boolean> {
    const qb = this.userRepository
      .createQueryBuilder('teacher')
      .where('teacher.user_id = :userId', { userId: id });

    return await qb.getExists();
  }
}
