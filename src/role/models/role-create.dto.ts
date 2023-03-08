import { Type } from 'class-transformer';
import { ArrayMinSize, IsNotEmpty, ValidateIf, ValidateNested } from 'class-validator';
import { PermissionDto } from './permission.dto';

export class RoleCreateDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @ValidateNested({each:true})
  @ArrayMinSize(1)
  @Type(() => PermissionDto)
  permissions: PermissionDto[];
}
