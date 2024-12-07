import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TransactionManagerService } from '../../shared/services/transaction-manager.service';
import { ResponseHandler } from '../../helper/response.handler';
import { UsersRepository } from './repositories/users.repository';
import { UserRole } from '../../constants/enum/roles.enum';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly transactionManager: TransactionManagerService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<{ data: User }> {
    const transactionManager = await this.transactionManager.startTransaction();
    try {
      const { ...userData } = createUserDto;

      // check if email already exists
      const isEmailExist = await this.usersRepository.checkUniqueEmail(
        userData.email,
      );

      if (isEmailExist) {
        return ResponseHandler.errorUnprocessableEntity('Email already exists');
      }

      // check if national id already exists
      const isNationalIdExist =
        await this.usersRepository.checkUniqueNationalId(userData.nationalId);
      if (isNationalIdExist) {
        return ResponseHandler.errorUnprocessableEntity(
          'National ID already exists',
        );
      }
      userData.role = 'PARENT';
      const user = new User(createUserDto);

      const createdUser = await transactionManager.save(user);

      await this.transactionManager.commitTransaction(transactionManager);
      return ResponseHandler.created<User>(createdUser);
    } catch (error) {
      await this.transactionManager.rollbackTransaction(transactionManager);
      throw error;
    } finally {
      await this.transactionManager.releaseTransaction(transactionManager);
    }
  }

  async findAll(): Promise<{ data: { data: User[] }; message: string }> {
    const users = await this.usersRepository.find();
    return ResponseHandler.successArray(users, 'Users found successfully');
  }

  async findOne(id: number): Promise<{ data: User; message: string }> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw ResponseHandler.errorBadRequest('User not found');
    }
    return ResponseHandler.successObject(user, 'User found successfully');
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<{ data: User; message: string }> {
    const transactionManager = await this.transactionManager.startTransaction();

    try {
      const partialEntity = { id, ...updateUserDto };

      // Validate role if provided
      if (
        partialEntity.role &&
        !Object.values(UserRole).includes(partialEntity.role as UserRole)
      ) {
        throw new HttpException(
          `Invalid role provided: ${partialEntity.role}. Valid roles are: ${Object.values(UserRole).join(', ')}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      // Save the partial entity
      const updatedUser = await transactionManager.save(User, partialEntity);

      await this.transactionManager.commitTransaction(transactionManager);

      return ResponseHandler.successObject(
        updatedUser,
        'User updated successfully',
      );
    } catch (error) {
      await this.transactionManager.rollbackTransaction(transactionManager);
      throw error;
    } finally {
      await this.transactionManager.releaseTransaction(transactionManager);
    }
  }

  async deleteUser(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      return ResponseHandler.errorBadRequest('User not found');
    }
  }
}
