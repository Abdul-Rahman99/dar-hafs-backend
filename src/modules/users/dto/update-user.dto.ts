import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  nationalId: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  role: string;

  @IsOptional()
  @IsPhoneNumber('EG')
  phoneNumber: string;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  dateOfBirth: Date;
}
