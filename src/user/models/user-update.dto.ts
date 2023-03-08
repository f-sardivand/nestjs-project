import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UserUpdateDto {
  @IsOptional()
  first_name: string;

  @IsOptional()
  last_name: string;

  @IsOptional()
  @IsEmail()
  email: string;
}
