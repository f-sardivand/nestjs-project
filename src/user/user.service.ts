import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { UserUpdateDto } from './models/user-update.dto';
import { User } from './models/user.entity';

@Injectable()
export class UserService extends AbstractService {
  constructor(
    @InjectRepository(User) private readonly userRepositoty: Repository<User>,
  ) {
    super(userRepositoty);
  }

  // async all(): Promise<User[]> {
  //   return await this.userRepositoty.find();
  // }

  async paginate(page = 1, relations=[]): Promise<any> {
    const { data, meta } = await super.paginate(page, relations);

    return {
      data: data,
      meta,
    };
  }

  // async create(data): Promise<User> {
  //   return await this.userRepositoty.save(data);
  // }

  // async findOne(condition): Promise<User> {
  //   return await this.userRepositoty.findOne({ where: condition });
  // }

  // async update(id: number, data): Promise<any> {
  //   return await this.userRepositoty.update(id, data);
  // }

  // async delete(id: number): Promise<any> {
  //   return await this.userRepositoty.delete(id);
  // }
}
