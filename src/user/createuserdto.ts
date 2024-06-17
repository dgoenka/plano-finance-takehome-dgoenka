import { IsISO8601, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  @IsString()
  name: string;
  @IsString()
  surname: string;
  @IsString()
  username: string;
  @IsString()
  @IsISO8601()
  birthdate: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
