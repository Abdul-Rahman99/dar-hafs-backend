import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsDate, IsNumber } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value)) // Transform plain date string to Date instance
  dateOfBirth: Date;

  @IsNotEmpty()
  @IsString()
  gradeLevel: string;

  @IsNotEmpty()
  @IsNumber()
  parentId: number;
}
