import { Type } from 'class-transformer';
import { ArrayMinSize, IsNotEmpty, IsOptional, ValidateIf, ValidateNested } from 'class-validator';
import { PermissionDto } from './permission.dto';

export class RoleUpdateDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @ValidateNested({each:true})
  @ArrayMinSize(1)
  @Type(() => PermissionDto)
  permissions: PermissionDto[];
}
