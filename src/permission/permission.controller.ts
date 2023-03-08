import { Controller, Get } from '@nestjs/common';
import { Permission } from './model/permission.entity';
import { PermissionService } from './permission.service';

@Controller('permissions')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}
  
  @Get()
  all(): Promise<Permission[]> {
    return this.permissionService.all();
  }
}
