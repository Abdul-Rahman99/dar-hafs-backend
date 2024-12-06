import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateTeacherDto {
  @IsNotEmpty()
  @IsNumber()
  user: number;

  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsNotEmpty()
  @IsString()
  yearsOfExperience: number;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsNumber()
  salary: number;
}
