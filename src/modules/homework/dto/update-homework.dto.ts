import { IsString, IsEnum } from 'class-validator';

export class UpdateHomeworkDto {
  @IsString()
  title?: string;

  @IsString()
  details?: string;

  @IsEnum(['Assigned', 'Submitted', 'Checked'])
  status?: 'Assigned' | 'Submitted' | 'Checked';
}
