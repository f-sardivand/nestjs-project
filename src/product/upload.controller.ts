import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Controller('')
export class UploadController {
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename(_, file, callback) {
          return callback(null, `${uuidv4()}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file) {
    console.log(file);
    return {
      url: `http://localhost:8000/api/${file.path}`,
    };
  }

  @Get('uploads/:path')
  async getImgae(@Param('path') path: string, @Res() res: Response) {
    res.sendFile(path, { root: 'uploads' });
  }
}
