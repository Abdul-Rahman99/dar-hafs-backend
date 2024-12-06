import { IsNotEmpty, IsString, IsEnum, IsNumber } from 'class-validator';

export class CreateHomeworkDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  details?: string;

  @IsNumber()
  studentId: number;

  @IsNumber()
  teacherId: number;

  @IsEnum(['Assigned', 'Submitted', 'Checked'])
  status?: 'Assigned' | 'Submitted' | 'Checked';
}
