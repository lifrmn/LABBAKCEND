import { BadRequestException, Controller, Get, Param, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserDecorator } from 'src/user.decorator';
import { user } from '@prisma/client';
import { Response } from 'express';


@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
    
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
   uploadFile(@UploadedFile() file: Express.Multer.File, @UserDecorator() user : user) {
       if(file == null)throw new BadRequestException("file tidak boleh kosong!")

      return this.profileService.uploadFile(file,user.id);
    }

    @Get('/:id')
    async getprofile(@Param('id') id:number,@Res() res: Response) {
        const fileName = await this.profileService.sendMyFotoProfile(id);

        return res.sendFile('../../uploads/'+fileName);
    }
}
