import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './models/register.dto';
import { User } from 'src/user/models/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Request, response, Response } from 'express';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private authService:AuthService
  ) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    if (body.password !== body.password_confirm) {
      throw new BadRequestException('passwordsdo not match!!!');
    }
    const hashPassword = await bcrypt.hash(body.password, 12);
    return await this.userService.create({ ...body, password: hashPassword });
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<User> {
    const user = await this.userService.findOne({ email });
    console.log(user);

    if (!user) {
      throw new NotFoundException();
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }

    const jwtToken = await this.jwtService.signAsync({ id: user.id });
    console.log(jwtToken);

    response.cookie('jwt', jwtToken, { httpOnly: true });
    return user;
  }

  // @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard)
  @Get('user')
  async user(@Req() request: Request) {
    // const cookie = request.cookies['jwt'];
    // if (!cookie) {
    //   throw new NotFoundException();
    // }
    // const data = await this.jwtService.verifyAsync(cookie);
    const id = await this.authService.userId(request);
    const user = await this.userService.findOne({ id });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return {
      message: 'success',
    };
  }
}
