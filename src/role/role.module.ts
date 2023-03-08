import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleController } from './role.controller';
import { Role } from './models/role.entity';
import { RoleService } from './role.service';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), CommonModule],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
