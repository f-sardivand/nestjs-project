import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { RoleCreateDto } from './models/role-create.dto';
import { Role } from './models/role.entity';

@Injectable()
export class RoleService extends AbstractService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {
    super(roleRepository)
  }

 

  async findOne(condition): Promise<Role> {
    return await this.roleRepository.findOne({ where: condition , relations:["permissions"]});
  }

  async update(id: number, data:any): Promise<any> {
    console.log(id);
    const role = await this.findOne({id});
    console.log(role);
    role.name = data.name;
    role.permissions= data.permissions;
    const r = await this.roleRepository.preload(role)
    console.log("role",r);
    
    return await this.roleRepository.save(r);

  }

  async delete(id: number): Promise<any> {
    return await this.roleRepository.delete(id);
  }
}
