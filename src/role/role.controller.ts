import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleCreateDto } from './models/role-create.dto';
import { RoleUpdateDto } from './models/role-update.dto';
import { Role } from './models/role.entity';
import { RoleService } from './role.service';

@UseGuards(AuthGuard)
@Controller('roles')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get()
  async all(): Promise<Role[]> {
    return this.roleService.all(["permissions"]);
  }

  @Post()
  async create(@Body() body: RoleCreateDto) {
    return this.roleService.create(body)
  }

  @Get(':id')
  async user(@Param('id') id: number) {
    return await this.roleService.findOne({ id });
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: RoleUpdateDto) {
    await this.roleService.update(id,body);
    return await this.roleService.findOne({ id });
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.roleService.delete(id);
  }
}
