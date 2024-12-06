import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(
      userRepository.target,
      userRepository.manager,
      userRepository.queryRunner,
    );
  }

  async checkUniqueUsername(username: string): Promise<boolean> {
    const qb = this.userRepository
      .createQueryBuilder('user')
      .where('user.name = :name', { name: username });
    return await qb.getExists();
  }
  async checkUniqueEmail(email: string): Promise<boolean> {
    const qb = this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: email });
    return await qb.getExists();
  }
  async checkUniqueNationalId(national_id: string): Promise<boolean> {
    const qb = this.userRepository
      .createQueryBuilder('user')
      .where('user.nationalId = :nationalId', { nationalId: national_id });
    return await qb.getExists();
  }
}
