import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserCreateDto } from './models/user-create.dto';
import { User } from './models/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserUpdateDto } from './models/user-update.dto';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';

@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get()
  async all(@Query('page') page = 1) {
    return await this.userService.paginate(page, ['role']);
  }

  @Post()
  async create(@Body() body: UserCreateDto): Promise<User> {
    const password = await bcrypt.hash('12345', 12);
    return this.userService.create({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      password,
      role: { id: body.role_id },
    });
  }

  @Put('info')
  async updateInfo(@Req() request: Request, @Body() body: UserUpdateDto) {
    const id = await this.authService.userId(request);
    await this.userService.update(id, body);
    return await this.userService.findOne({ id });
  }

  @Put('password')
  async updatePassword(
    @Req() request: Request,
    @Body('password') password: string,
    @Body('password_confirm') password_confirm: string,
  ) {
    if (password !== password_confirm) {
      throw new BadRequestException('passwordsdo not match!!!');
    }
    const hashed = await bcrypt.hash(password, 12);

    const id = await this.authService.userId(request);
    await this.userService.update(id, { password: hashed });
    return await this.userService.findOne({ id });
  }

  @Get(':id')
  async user(@Param('id') id: number) {
    return await this.userService.findOne({ id }, ['role']);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: UserUpdateDto) {
    await this.userService.update(id, body);
    return await this.userService.findOne({ id });
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.userService.delete(id);
  }
}
