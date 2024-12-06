import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { Student } from '../students/entities/student.entity';
import { UsersRepository } from './repositories/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, Student])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [TypeOrmModule],
})
export class UsersModule {}
