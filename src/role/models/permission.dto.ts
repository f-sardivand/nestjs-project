import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class PermissionDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(8)
  id: number;
}
